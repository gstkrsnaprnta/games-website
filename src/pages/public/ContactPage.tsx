import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { PageHero } from "../../components/public/PageHero";

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontak"
        title="Hubungi panitia GAMES"
        description="Butuh bantuan pendaftaran atau informasi lomba? Panitia siap membantu menjawab pertanyaanmu."
      />
      <section className="container-page grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
        <ContactCard
          icon={<Mail size={24} />}
          iconBg="bg-gradient-to-br from-[#770525] to-[#9b0b34]"
          title="Email"
          value="hmpsmath.fmipauho@gmail.com"
          description="Kirim pertanyaan kapan saja, kami balas dalam 1×24 jam kerja."
        />
        <ContactCard
          icon={<MessageCircle size={24} />}
          iconBg="bg-gradient-to-br from-[#004551] to-[#0a5a68]"
          title="WhatsApp"
          value="0852-5992-5171/0822-1423-7136"
          description="Chat langsung dengan tim panitia GAMES untuk respon cepat."
        />
        <ContactCard
          icon={<Send size={24} />}
          iconBg="bg-gradient-to-br from-[#faadb6] to-[#d68b94]"
          title="Sosial Media"
          value="@games.uho"
          description="Ikuti update terbaru di Instagram dan platform sosial media kami."
        />
      </section>

      {/* Map / Location placeholder */}
      <section className="container-page pb-20">
        <div className="glass-panel rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c2e1df]/20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="grid size-12 place-items-center rounded-2xl bg-white shadow-inner text-[#004551]">
                <MapPin size={22} />
              </div>
              <h2 className="text-2xl font-black text-[#004551]">
                Sekretariat GAMES
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#004551]/75 max-w-2xl">
              Ruang 3 - Sekretariat Himpunan Mahasiswa FMIPA UHO
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  iconBg,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="glass-card-premium rounded-[2rem] p-8">
      <div
        className={`grid size-14 place-items-center rounded-2xl ${iconBg} text-white shadow-lg`}
      >
        {icon}
      </div>
      <h2 className="mt-6 text-xl font-black text-[#004551]">{title}</h2>
      <p className="mt-2 text-lg font-black text-[#770525]">{value}</p>
      <p className="mt-4 text-sm leading-relaxed text-[#004551]/60">
        {description}
      </p>
    </div>
  );
}
