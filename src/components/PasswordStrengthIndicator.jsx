import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";

const PasswordStrengthIndicator = ({ password }) => {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: "", color: "" };

        let score = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        };

        // Calculate score
        if (checks.length) score += 20;
        if (checks.uppercase) score += 20;
        if (checks.lowercase) score += 20;
        if (checks.number) score += 20;
        if (checks.special) score += 20;

        // Determine label and color
        let label = "";
        let color = "";

        if (score < 40) {
            label = "Weak";
            color = "bg-red-500";
        } else if (score < 80) {
            label = "Medium";
            color = "bg-yellow-500";
        } else {
            label = "Strong";
            color = "bg-green-500";
        }

        return { score, label, color, checks };
    }, [password]);

    if (!password) return null;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Password Strength:</span>
                <span className={`text-sm font-medium ${strength.score < 40 ? 'text-red-500' :
                        strength.score < 80 ? 'text-yellow-500' :
                            'text-green-500'
                    }`}>
                    {strength.label}
                </span>
            </div>

            <Progress value={strength.score} className="h-2" />

            <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className={strength.checks.length ? "text-green-500" : "text-red-500"}>
                        {strength.checks.length ? "✓" : "✗"}
                    </span>
                    <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={strength.checks.uppercase ? "text-green-500" : "text-red-500"}>
                        {strength.checks.uppercase ? "✓" : "✗"}
                    </span>
                    <span>One uppercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={strength.checks.lowercase ? "text-green-500" : "text-red-500"}>
                        {strength.checks.lowercase ? "✓" : "✗"}
                    </span>
                    <span>One lowercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className={strength.checks.number ? "text-green-500" : "text-red-500"}>
                        {strength.checks.number ? "✓" : "✗"}
                    </span>
                    <span>One number</span>
                </div>
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
