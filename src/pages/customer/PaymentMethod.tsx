import { CreditCard, Shield, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { PaymentProvider } from "./PaymentPage";

type PaymentMethodCardProps = {
  provider: PaymentProvider;
  onChange: (provider: PaymentProvider) => void;
};

const methods = [
  {
    id: "Razorpay" as const,
    icon: Wallet,
    title: "Razorpay",
    description: "UPI, Cards, Wallets, Net Banking & EMI",
    badge: "Popular in India",
  },
  {
    id: "Stripe" as const,
    icon: CreditCard,
    title: "Stripe",
    description: "Credit & Debit Cards with international support",
    badge: "Global payments",
  },
];

export default function PaymentMethodCard({ provider, onChange }: PaymentMethodCardProps) {
  return (
    <Card className="border-0 shadow-lg ring-1 ring-border/60">
      <CardHeader>
        <CardTitle className="text-xl">Payment Method</CardTitle>
        <p className="text-sm text-muted-foreground">Select your preferred payment provider.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {methods.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className={`flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition-all ${
              provider === method.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-transparent bg-muted/30 hover:border-border hover:bg-muted/50"
            }`}
          >
            <input
              id={method.id}
              type="radio"
              name="paymentProvider"
              className="mt-1 accent-primary"
              checked={provider === method.id}
              onChange={() => onChange(method.id)}
            />
            <div className={`mt-0.5 flex size-12 items-center justify-center rounded-xl ${provider === method.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              <method.icon className="size-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{method.title}</h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {method.badge}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
            </div>
          </Label>
        ))}

        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-sm text-emerald-800">
          <Shield className="size-5 shrink-0" />
          <p>Your payment information is encrypted and never stored on our servers.</p>
        </div>
      </CardContent>
    </Card>
  );
}
