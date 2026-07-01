import TraceDivider, { DiamondBullet } from "@/components/ui/TraceDivider";
import Button from "@/components/ui/Button";

const CONTACT_LINES = [
  "Cebu Institute of Technology – University · Computer Engineering Department",
  "GLE Building, 7th Floor",
  "(032) 411-2000 local 189",
  "Office Hours: Mon–Fri 8:00 AM–12:00 NN & 1:30 PM–5:00 PM; Saturday 8:00 AM–12:00 NN",
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-card border-t border-line scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <TraceDivider label="Contact Us" as="h2" className="mb-8" />
        <ul className="space-y-3 mb-8">
          {CONTACT_LINES.map((line) => (
            <li key={line} className="flex items-start gap-3 text-gray text-sm leading-relaxed">
              <DiamondBullet className="mt-1.5" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <a href="https://www.facebook.com/cituCPE" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Follow us on Facebook</Button>
        </a>
      </div>
    </section>
  );
}
