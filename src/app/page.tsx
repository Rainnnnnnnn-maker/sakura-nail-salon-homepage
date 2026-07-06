import Image from "next/image";

const bookingUrl =
  "https://beauty.hotpepper.jp/CSP/kr/reserve/?storeId=H000511388";

const menuItems = [
  {
    tag: "初回",
    name: "ワンカラー・ラメグラ",
    description: "新規オフ無料・丁寧なケア込み",
    price: "¥4,500",
  },
  {
    tag: "初回",
    name: "定額 A コース",
    description: "カラー変更無料・新規オフ無料",
    price: "¥5,980",
  },
  {
    tag: "人気",
    name: "持ち込みデザイン",
    description: "お好みの画像をもとにご提案",
    price: "¥6,500〜",
  },
  {
    tag: "FOOT",
    name: "フット ワンカラー＋アート",
    description: "ラメアート付き",
    price: "¥6,000",
  },
];

const strengths = [
  {
    number: "01",
    title: "美しいフォルム",
    text: "横顔まで美しい、なめらかな仕上がり。自爪への負担に配慮しながら、もちの良さを追求します。",
  },
  {
    number: "02",
    title: "700色のカラー",
    text: "肌なじみのよい色から旬のマグネットまで。迷う時間も楽しめるよう、似合う色をご提案します。",
  },
  {
    number: "03",
    title: "丁寧なカウンセリング",
    text: "仕事や暮らしに合うデザインを一緒に。マンツーマンで、初めての方にもわかりやすくご案内します。",
  },
];

const faqs = [
  {
    question: "初めてでも予約できますか？",
    answer:
      "はい、初めての方も歓迎です。デザインやカラーが決まっていなくても、当日カウンセリングしながらご提案します。",
  },
  {
    question: "持ち込みデザインは可能ですか？",
    answer:
      "可能です。ご希望の画像をご用意ください。パーツや爪の状態により、近いデザインをご提案する場合があります。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "駐車場をご用意しています。お車でお越しの際は、予約時の備考欄にご記入ください。",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function FlowerMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? "flower-mark flower-mark--small" : "flower-mark"}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path d="M24 23C9 22 6 9 13 5c6-3 12 5 11 18Z" />
      <path
        d="M24 23C9 22 6 9 13 5c6-3 12 5 11 18Z"
        transform="rotate(72 24 24)"
      />
      <path
        d="M24 23C9 22 6 9 13 5c6-3 12 5 11 18Z"
        transform="rotate(144 24 24)"
      />
      <path
        d="M24 23C9 22 6 9 13 5c6-3 12 5 11 18Z"
        transform="rotate(216 24 24)"
      />
      <path
        d="M24 23C9 22 6 9 13 5c6-3 12 5 11 18Z"
        transform="rotate(288 24 24)"
      />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "桜ネイルサロン",
    alternateName: "サクラネイルサロン",
    url: siteUrl,
    image: `${siteUrl}/images/hero-sakura-nail.png`,
    description:
      "名古屋市北区・上飯田駅徒歩2分。豊富なカラーとパーツ、丁寧なカウンセリングが魅力のネイルサロン。",
    priceRange: "¥4,500〜",
    paymentAccepted: "現金",
    address: {
      "@type": "PostalAddress",
      streetAddress: "上飯田西町3-10-10",
      addressLocality: "名古屋市北区",
      addressRegion: "愛知県",
      postalCode: "462-0809",
      addressCountry: "JP",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: ["https://beauty.hotpepper.jp/kr/slnH000511388/"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ネイルメニュー",
      itemListElement: menuItems.map((item) => ({
        "@type": "Offer",
        priceCurrency: "JPY",
        name: item.name,
        description: item.description,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="桜ネイルサロン トップへ">
          <FlowerMark small />
          <span className="brand__name">
            桜<span>NAIL SALON</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#concept">私たちのこだわり</a>
          <a href="#design">デザイン</a>
          <a href="#menu">メニュー</a>
          <a href="#access">アクセス</a>
        </nav>
        <a
          className="header-booking"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          WEB予約
          <ArrowIcon />
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__image">
            <Image
              src="/images/hero-sakura-nail.png"
              alt="桜色とパールの上品なジェルネイル"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 58vw"
            />
          </div>
          <div className="hero__content">
            <p className="eyebrow">KAMIIIDA, NAGOYA</p>
            <h1 id="hero-title">
              私らしさが、
              <br />
              <em>指先に咲く。</em>
            </h1>
            <p className="hero__lead">
              700色の中から見つける、あなただけの彩り。
              <br />
              丁寧なケアと美しいフォルムで、毎日を少し特別に。
            </p>
            <div className="hero__actions">
              <a
                className="button button--primary"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                空席確認・予約する
                <ArrowIcon />
              </a>
              <a className="text-link" href="#menu">
                メニューを見る
                <ArrowIcon />
              </a>
            </div>
            <div className="hero__meta">
              <div>
                <strong>4.83</strong>
                <span>口コミ評価 / 116件</span>
              </div>
              <div>
                <strong>2<span>min.</span></strong>
                <span>上飯田駅から徒歩</span>
              </div>
            </div>
          </div>
          <p className="hero__scroll">SCROLL <span /></p>
        </section>

        <section className="intro section-shell" id="concept">
          <div className="section-heading">
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <h2>
              かわいい、だけじゃない。
              <br />
              <span>ずっと眺めたくなる指先へ。</span>
            </h2>
          </div>
          <div className="intro__copy">
            <p>
              桜ネイルサロンは、名古屋市北区・上飯田の
              プライベート感のあるネイルサロンです。
            </p>
            <p>
              シンプル、韓国・ワンホン、華やかなイベントネイルまで。
              一人ひとりの爪やライフスタイルに向き合い、
              「似合う」と「好き」が重なるデザインをご提案します。
            </p>
          </div>
        </section>

        <section className="strengths section-shell" aria-label="選ばれる理由">
          {strengths.map((item) => (
            <article className="strength-card" key={item.number}>
              <span className="strength-card__number">{item.number}</span>
              <div className="strength-card__line" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="design-section" id="design">
          <div className="design-section__visual">
            <div className="design-image design-image--main">
              <Image
                src="/images/magnetic-nail.png"
                alt="ローズベージュのマグネットネイル"
                fill
                sizes="(max-width: 800px) 76vw, 32vw"
              />
            </div>
            <div className="design-image design-image--sub">
              <Image
                src="/images/micro-french-nail.png"
                alt="ボルドーのマイクロフレンチネイル"
                fill
                sizes="(max-width: 800px) 52vw, 22vw"
              />
            </div>
            <span className="design-section__flower">
              <FlowerMark />
            </span>
          </div>
          <div className="design-section__content">
            <p className="eyebrow">DESIGN GALLERY</p>
            <h2>
              その日の気分を
              <br />
              指先に映して。
            </h2>
            <p>
              トレンドのマグネットから、オフィスになじむ上品ネイル、
              特別な日の華やかなアートまで。豊富なカラーとパーツで
              理想のイメージを形にします。
            </p>
            <div className="design-tags" aria-label="対応デザイン">
              <span>MAGNET</span>
              <span>SIMPLE</span>
              <span>KOREAN</span>
              <span>BRIDAL</span>
              <span>FOOT</span>
            </div>
            <a
              className="text-link text-link--light"
              href="https://beauty.hotpepper.jp/kr/slnH000511388/photo/"
              target="_blank"
              rel="noreferrer"
            >
              デザインをもっと見る
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="menu-section section-shell" id="menu">
          <div className="menu-section__header">
            <div className="section-heading">
              <p className="eyebrow">POPULAR MENU</p>
              <h2>
                はじめての方にも
                <br />
                <span>選びやすいメニュー。</span>
              </h2>
            </div>
            <p>
              表示価格は税込です。デザインやパーツにより料金が
              変わる場合があります。詳しくは予約ページをご確認ください。
            </p>
          </div>
          <div className="menu-list">
            {menuItems.map((item) => (
              <a
                className="menu-item"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                key={item.name}
              >
                <span className="menu-item__tag">{item.tag}</span>
                <div className="menu-item__name">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <strong>{item.price}</strong>
                <span className="menu-item__arrow">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
          <div className="menu-section__cta">
            <a
              className="button button--outline"
              href="https://beauty.hotpepper.jp/kr/slnH000511388/coupon/"
              target="_blank"
              rel="noreferrer"
            >
              すべてのメニューを見る
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="review-section">
          <div className="review-section__inner section-shell">
            <p className="eyebrow">CUSTOMER VOICE</p>
            <div className="review-score">
              <span className="review-score__stars">★★★★★</span>
              <strong>4.83</strong>
              <span>HOT PEPPER Beauty 口コミ116件</span>
            </div>
            <blockquote>
              「デザインも豊富でいつも悩んでしまいますが、
              優しくアドバイスくださり施術も丁寧です。
              また次のネイルも楽しみになりました。」
            </blockquote>
            <p className="review-section__source">
              20代・会社員のお客様 / HOT PEPPER Beauty 掲載口コミより
            </p>
            <a
              className="text-link"
              href="https://beauty.hotpepper.jp/kr/slnH000511388/review/"
              target="_blank"
              rel="noreferrer"
            >
              口コミをもっと見る
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="access-section section-shell" id="access">
          <div className="access-section__info">
            <p className="eyebrow">ACCESS &amp; INFORMATION</p>
            <h2>桜ネイルサロン</h2>
            <p className="access-section__kana">SAKURA NAIL SALON</p>
            <dl>
              <div>
                <dt>住所</dt>
                <dd>愛知県名古屋市北区上飯田西町3-10-10</dd>
              </div>
              <div>
                <dt>アクセス</dt>
                <dd>地下鉄・名鉄 上飯田駅 3番出口より徒歩約2分</dd>
              </div>
              <div>
                <dt>営業時間</dt>
                <dd>9:00–19:00（最終受付 17:00）</dd>
              </div>
              <div>
                <dt>定休日</dt>
                <dd>不定休</dd>
              </div>
              <div>
                <dt>お支払い</dt>
                <dd>現金のみ</dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>あり（予約時にお知らせください）</dd>
              </div>
            </dl>
            <a
              className="button button--primary"
              href="https://www.google.com/maps/search/?api=1&query=%E6%84%9B%E7%9F%A5%E7%9C%8C%E5%90%8D%E5%8F%A4%E5%B1%8B%E5%B8%82%E5%8C%97%E5%8C%BA%E4%B8%8A%E9%A3%AF%E7%94%B0%E8%A5%BF%E7%94%BA3-10-10"
              target="_blank"
              rel="noreferrer"
            >
              Google Mapsで見る
              <ArrowIcon />
            </a>
          </div>
          <div className="access-section__map" aria-label="店舗周辺案内図">
            <div className="map-grid" />
            <span className="map-station">上飯田駅</span>
            <span className="map-route map-route--one" />
            <span className="map-route map-route--two" />
            <span className="map-pin">
              <FlowerMark small />
            </span>
            <div className="map-label">
              <strong>桜ネイルサロン</strong>
              <span>SAKURA NAIL SALON</span>
            </div>
            <span className="map-walk">徒歩 約2分</span>
          </div>
        </section>

        <section className="faq-section section-shell">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>よくあるご質問</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>Q</span>
                  {item.question}
                  <i aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="booking-section">
          <FlowerMark />
          <p className="eyebrow">RESERVATION</p>
          <h2>
            指先から、次の季節を
            <br />
            はじめませんか。
          </h2>
          <p>24時間いつでも、HOT PEPPER Beautyからご予約いただけます。</p>
          <a
            className="button button--cream"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            空席確認・予約する
            <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#top">
          <FlowerMark small />
          <span className="brand__name">
            桜<span>NAIL SALON</span>
          </span>
        </a>
        <div className="site-footer__links">
          <a href="#concept">私たちのこだわり</a>
          <a href="#design">デザイン</a>
          <a href="#menu">メニュー</a>
          <a href="#access">アクセス</a>
        </div>
        <p>© {new Date().getFullYear()} Sakura Nail Salon</p>
      </footer>

      <a
        className="mobile-booking"
        href={bookingUrl}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <small>24H ONLINE</small>
          空席確認・予約する
        </span>
        <ArrowIcon />
      </a>
    </>
  );
}
