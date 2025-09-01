import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const faqs = [
  {
    question: "İsviçre'nin en iyi yanı nedir?",
    id: 1,
    answer:
      " Çikolatası, peyniri ve saatleri... Hem tatlı hem düzenli hem de her zaman tam zamanında. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "Vücudu ve burnu olmayan birine ne denir?",
    id: 2,
    answer:
      "Kimse bilmiyor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.",
  },
];

// Sıkça Sorulan Sorular (FAQ) bölümü oluşturuyoruz.. Kullanıcı sorulara tıklayarak yanıtları genişletebilir veya daraltabilir.
// Görevler:
// 1. isOpen state değişkenini ana bileşene (FAQ) taşıyın ve her bir sorunun durumunu ayrı ayrı kontrol etmek için bir state yapısı kullanın.
// 2. Bu durumu Accordion bileşenine props aracılığıyla aktararak state paylaşımı gerçekleştirin.
// 3. Aynı anda yalnızca bir sorunun açık olmasını sağlayın (soru genişletildiğinde diğerleri otomatik olarak kapansın).
// 4. Kullanıcı soruyu genişlettiğinde veya daralttığında, bu durumu console.log() ile görüntüleyin (örn. "Soru 1 genişletildi.").

// Bonus:
// - Kullanıcı soruların hepsini tek bir tıklama ile açıp kapatabileceği "Tümünü Aç/Kapat" butonu ekleyin.
// - Sorulara hızlıca erişim sağlamak için  arama çubuğu ekleyin. Arama sonuçlarına göre sadece ilgili soruları listeleyin.
// - Genişletme ve daraltma animasyonları ekleyin (Tailwind'in transition class'larını kullanarak yumuşak geçişler oluşturun).

// Tailwind ile ilgili istekler:
// 1. Aktif olan (açık olan) sorunun başlığına farklı stil uygulayın (kalın yazı, farklı arka plan rengi veya metin rengi).
// 2. Genişletilmiş yanıt metni için daha dikkat çekici arka plan rengi veya çerçeve ekleyin.
// 3. "Sıkça Sorulan Sorular" başlığına, mobil cihazlar ve geniş ekranlarda farklı yazı boyutları ve hizalama düzenleri uygulayın.
// 4. Soruların üzerine gelindiğinde (hover durumu), metin rengini veya arka plan rengini değiştirerek görsel geri bildirim sağlayın.
// 5. Mobil cihazlarda daha küçük butonlar ve daha kompakt düzen kullanarak tasarımı optimize edin.

export default function FAQ() {
  const [openIds, setOpenIds] = useState([]);
  const [search, setSearch] = useState("");

  const filterQuestions = faqs.filter((faq) => faq.question.toLowerCase().includes(search.toLowerCase()));

  const handleToggle = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
      console.log(`Soru ${id} kapatıldı`);
    } else {
      setOpenIds([id]);
      console.log(`Soru ${id} açıldı`);
    }
  };
  const handleAllToggle = () => {
    if (openIds.length === faqs.length) {
      setOpenIds([]);
      console.log("Tüm sorular kapatıldı");
    } else {
      setOpenIds(faqs.map((f) => f.id));
      console.log("Tüm sorular açıldı");
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Sıkça sorulan sorular
          </h2>
          <div className="flex justify-between p-5 border  rounded-xs border-black border-3 shadow-2xl">
            <input type="text" placeholder="Search ..." className=" flex-4 px-5 py-2 text-black
             outline-none  border-b-4 border-indigo-500" onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleAllToggle} className="border border-2 flex-1 text-white bg-indigo-500 px-3">
              {openIds.length === faqs.length ? "Tümünü Kapat" : "Tümünü Aç"}
            </button>
          </div>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            
            {filterQuestions.map((faq) => (
              <Accordion
                key={faq.id}
                faq={faq}
                isOpen={openIds.includes(faq.id)}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Accordion({ faq, isOpen, onToggle }) {
  return (
    <div className="pt-6">
      <dt>
        <button
          onClick={onToggle}
          className={`flex w-full items-start justify-between text-left text-gray-900 transition ${isOpen ? "font-bold bg-gray-100 text-indigo-500": "text-gray-900"} hover:bg-gray-50 p-2 rounded-md`}
        >
          <span className="text-base font-semibold leading-7">
            {faq.question}
          </span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <MinusCircleIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </span>
        </button>
      </dt>
        <dd
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base leading-7 text-gray-600 bg-gray-50 p-4 rounded-md border">
          {faq.answer}
        </p>
      </dd>
    </div>
  );
}
