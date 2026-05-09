import { Mail, MessageCircle, Send } from "lucide-react";
import { PageHero } from "../../components/public/PageHero";

export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Kontak" title="Hubungi panitia GAMES" description="Butuh bantuan pendaftaran atau informasi lomba? Panitia siap membantu." />
      <section className="container-page grid gap-5 py-12 md:grid-cols-3">
        <ContactCard icon={<Mail size={22} />} title="Email" value="panitia@games.example" />
        <ContactCard icon={<MessageCircle size={22} />} title="WhatsApp" value="08xx-xxxx-xxxx" />
        <ContactCard icon={<Send size={22} />} title="Sosial Media" value="@games.official" />
      </section>
    </>
  );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="games-card rounded-[1.7rem] p-6">
      <div className="grid size-12 place-items-center rounded-2xl bg-[#770525] text-white">{icon}</div>
      <h2 className="mt-5 text-xl font-black text-[#004551]">{title}</h2>
      <p className="mt-2 font-semibold text-[#004551]/70">{value}</p>
    </div>
  );
}
