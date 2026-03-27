import { LanguageSwitcher } from "../components/settings/LanguageSwitcher";
import { SecurityPanel } from "../components/settings/SecurityPanel";

export default function Settings() {
  return (
    <div className="space-y-3">
      <LanguageSwitcher />
      <SecurityPanel />
    </div>
  );
}
