import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }})
  }

  try {
    const { patientId, medicineId, caretakerProfileId, alertType, channel } = await req.json()

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    let phone = null;
    let caretakerName = "Caretaker";
    if (caretakerProfileId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('phone, full_name')
        .eq('id', caretakerProfileId)
        .single()
      
      if (!error && data) {
        phone = data.phone;
        caretakerName = data.full_name || caretakerName;
      }
    }

    const msg91Key = Deno.env.get('MSG91_AUTH_KEY')
    const templateId = alertType === 'emergency' 
      ? Deno.env.get('MSG91_TEMPLATE_ID_EMERGENCY') 
      : Deno.env.get('MSG91_TEMPLATE_ID_MISSED')

    let status = 'failed'
    
    if (phone && msg91Key && templateId) {
      const url = "https://api.msg91.com/api/v5/flow"
      const payload = {
        template_id: templateId,
        short_url: "0",
        recipients: [{ mobiles: "91" + phone.replace(/\D/g, ''), caretaker_name: caretakerName }]
      }
      
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'authkey': msg91Key,
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        status = 'sent'
      }
    }

    const { error: logError } = await supabase
      .from('alerts_log')
      .insert({
        patient_id: patientId,
        medicine_id: medicineId,
        caretaker_profile_id: caretakerProfileId,
        alert_type: alertType,
        channel: channel || 'sms',
        status: status,
        payload: { phone, sendResult: status }
      })

    return new Response(JSON.stringify({ success: true, status }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 400,
    })
  }
})
