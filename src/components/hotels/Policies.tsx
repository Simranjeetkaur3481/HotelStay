import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Policies() {
  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Policies</h2>

        <p className="text-sm text-muted-foreground">Important information about your stay.</p>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {/* Check-in / Check-out */}
        <AccordionItem value="checkin">
          <AccordionTrigger>Check-in / Check-out</AccordionTrigger>

          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>Check-in: From 2:00 PM</p>
            <p>Check-out: Until 11:00 AM</p>
            <p>Early check-in is subject to availability.</p>
          </AccordionContent>
        </AccordionItem>

        {/* Cancellation */}
        <AccordionItem value="cancellation">
          <AccordionTrigger>Cancellation Policy</AccordionTrigger>

          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>Free cancellation up to 48 hours before check-in.</p>

            <p>Cancellations made after this period may incur charges.</p>
          </AccordionContent>
        </AccordionItem>

        {/* Children */}
        <AccordionItem value="children">
          <AccordionTrigger>Children & Extra Beds</AccordionTrigger>

          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>Children of all ages are welcome.</p>
            <p>Extra beds available on request.</p>
          </AccordionContent>
        </AccordionItem>

        {/* Payment */}
        <AccordionItem value="payment">
          <AccordionTrigger>Payment Methods</AccordionTrigger>

          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>Credit/Debit Cards</p>
            <p>UPI Payments</p>
            <p>Pay at hotel available for select rooms</p>
          </AccordionContent>
        </AccordionItem>

        {/* House Rules */}
        <AccordionItem value="rules">
          <AccordionTrigger>House Rules</AccordionTrigger>

          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>No smoking inside rooms</p>
            <p>No loud music after 10 PM</p>
            <p>Pets allowed in selected rooms only</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
