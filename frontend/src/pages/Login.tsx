import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  return (
    <Card className="space-y-2">
      <h2 className="text-xl font-semibold">OTP Login</h2>
      <input className="h-12 w-full rounded-xl border px-3" placeholder="+91 phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="h-12 w-full rounded-xl border px-3" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button className="w-full">Verify</Button>
    </Card>
  );
}
