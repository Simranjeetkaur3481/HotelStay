import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-primary px-8 py-16 text-primary-foreground lg:px-20">

          {/* Decorative Background */}
          <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 text-center">

            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Mail className="size-8" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-bold">
              Stay Inspired
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Subscribe to receive exclusive hotel deals,
              travel inspiration, and seasonal offers directly
              in your inbox.
            </p>

            {/* Form */}
            <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 border-white/20 bg-white text-black placeholder:text-gray-500"
              />

              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8"
              >
                Subscribe
                <Send className="ml-2 size-4" />
              </Button>
            </form>

            {/* Bottom Text */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/90">
              <span>✓ No Spam</span>
              <span>✓ Weekly Deals</span>
              <span>✓ Unsubscribe Anytime</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}