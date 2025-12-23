/*
 * Design Philosophy: 陰翳礼讃モダン (Inyei Raisan Modernism)
 * 
 * - Dark lacquer backgrounds (#0d0d0d) to make food photography pop
 * - Warm gold accents (#d4af37) like lantern glow
 * - Vermillion red (#8b0000) for traditional touches
 * - Generous whitespace and slow, elegant animations
 * - Typography: Noto Serif JP (headings) + Noto Sans JP (body)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, Clock, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Section component with scroll animation
function AnimatedSection({
  children,
  className = "",
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Navigation component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#concept", label: "寿司忠の心" },
    { href: "#menu", label: "おしながき" },
    { href: "#specialties", label: "名物" },
    { href: "#space", label: "お部屋" },
    { href: "#access", label: "アクセス" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl tracking-wider text-gold-gradient">
            寿司忠
          </span>
          <span className="hidden sm:block text-xs text-muted-foreground tracking-widest">
            明治43年創業
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors duration-300 font-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0493-72-0018"
            className="btn-outline-gold rounded-none"
          >
            ご予約
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="メニュー"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-b border-border/50"
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base tracking-wider text-foreground/80 hover:text-primary transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0493-72-0018"
            className="btn-gold rounded-none text-center mt-4"
          >
            ご予約 0493-72-0018
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="images/hero_main.jpg"
          alt="寿司忠の会席料理"
          className="w-full h-full object-cover opacity-30"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-primary/90 text-sm tracking-[0.3em] mb-6 font-light">
            明治四十三年創業
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider mb-8 text-gold-gradient">
            料亭 寿司忠
          </h1>
          <p className="text-foreground/80 text-lg md:text-xl tracking-wider max-w-2xl mx-auto leading-relaxed font-light">
            武蔵の小京都・小川町で<br className="sm:hidden" />
            百年以上の歴史を紡ぐ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#menu" className="btn-gold rounded-none">
            おしながきを見る
          </a>
          <a href="tel:0493-72-0018" className="btn-outline-gold rounded-none">
            ご予約 0493-72-0018
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/50"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Concept Section
function ConceptSection() {
  return (
    <AnimatedSection id="concept" className="py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-primary/80 text-sm tracking-[0.3em] mb-4">PHILOSOPHY</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-gold-gradient">
            寿司忠の心
          </h2>
        </motion.div>

        {/* Main Image */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="relative aspect-[21/9] overflow-hidden glow-image">
            <img
              src="images/concept_bg.jpg"
              alt="寿司忠の店内"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {[
            {
              title: "伝統",
              subtitle: "老舗の誇り",
              description: "明治43年創業。100年以上の歴史の中で培われた「おもてなしの心」と、代々受け継がれてきた「味」を守り続けています。"
            },
            {
              title: "技術",
              subtitle: "なだ万の技",
              description: "四代目は老舗料亭「なだ万」で10年の修行を積み、確かな技術と感性で、新しい日本料理の世界を切り拓いています。"
            },
            {
              title: "地元",
              subtitle: "小川町の恵み",
              description: "「武蔵の小京都」と呼ばれる小川町の豊かな風土。地元の有機米や地酒など、地域の食材を活かした料理を提供します。"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-8 border border-border/30 hover:border-primary/30 transition-colors duration-500 group"
            >
              <div className="mb-6">
                <span className="font-serif text-4xl text-gold-gradient">{item.title}</span>
              </div>
              <h3 className="font-serif text-lg tracking-wider mb-4 text-foreground/90">
                {item.subtitle}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div variants={fadeInUp} className="mt-20 text-center max-w-3xl mx-auto">
          <div className="divider-gold mb-12" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 tracking-wide">
            寿司忠で創られるお料理の中にある<br />
            物語の主役はあなたです。
          </p>
          <div className="divider-gold mt-12" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Menu Section
function MenuSection() {
  const menuItems = [
    {
      title: "ランチ",
      subtitle: "LUNCH",
      description: "お得なランチセットや海鮮丼など。お昼のひとときを贅沢に。",
      price: "1,500円〜",
      image: "images/food_assorted.jpg"
    },
    {
      title: "ディナー・コース",
      subtitle: "DINNER COURSE",
      description: "四代目おまかせコースや季節の会席料理をご用意。",
      price: "5,000円〜",
      image: "images/course_wakadanna.jpg"
    },
    {
      title: "テイクアウト",
      subtitle: "TAKEOUT",
      description: "ご自宅でも料亭の味を。お祝いや法事のお弁当も承ります。",
      price: "1,000円〜",
      image: "images/unaju.jpg"
    }
  ];

  return (
    <AnimatedSection id="menu" className="py-24 md:py-32 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-primary/80 text-sm tracking-[0.3em] mb-4">MENU</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-gold-gradient">
            おしながき
          </h2>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative overflow-hidden bg-card border border-border/30 hover:border-primary/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-primary/70 text-xs tracking-[0.2em] mb-2">{item.subtitle}</p>
                <h3 className="font-serif text-xl tracking-wider mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                <p className="font-display text-lg text-primary tracking-wider">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Specialties Section
function SpecialtiesSection() {
  return (
    <AnimatedSection id="specialties" className="py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-primary/80 text-sm tracking-[0.3em] mb-4">SPECIALTIES</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-gold-gradient">
            名物
          </h2>
        </motion.div>

        {/* Unagi Feature */}
        <motion.div
          variants={fadeInUp}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="relative aspect-square lg:aspect-auto overflow-hidden glow-image">
            <img
              src="images/unaju.jpg"
              alt="寿司忠のうなぎ"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-1 text-sm tracking-wider">
              名物
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 lg:p-8">
            <h3 className="font-serif text-2xl md:text-3xl tracking-wider mb-6 text-gold-gradient">
              寿司忠のうなぎ
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              愛知県三河一色産を使用。注文を受けてから捌き、小川町の辛口地酒をふんだんに使って蒸し上げます。
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              ふっくらとした身と脂のくどさがない、あっさりとした仕上がり。一度口にすればトロリととろけ、焦したタレの香ばしい香りが鼻を抜けてゆきます。
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-1">上鰻重</p>
                <p className="font-display text-2xl text-primary">¥3,300<span className="text-sm ml-1">税込</span></p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">特上鰻重</p>
                <p className="font-display text-2xl text-primary">¥4,400<span className="text-sm ml-1">税込</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inari & Maki Feature */}
        <motion.div
          variants={fadeInUp}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="flex flex-col justify-center p-4 lg:p-8 order-2 lg:order-1">
            <h3 className="font-serif text-2xl md:text-3xl tracking-wider mb-6 text-gold-gradient">
              忠さんいなり・き久さん巻
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-6">
              創業以来の伝統を受け継ぐ、寿司忠の原点。「忠さん」は初代創業者 田中忠三郎の愛称、「き久」は忠三郎の妻に由来します。
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              特製のタレで大切に、継ぎ足し継ぎ足し、守り続けてきた寿司忠の「味」。お持ち帰りや差し入れにも大変喜ばれております。
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-1">忠さんいなり</p>
                <p className="font-display text-xl text-primary">¥154<span className="text-sm ml-1">税込/1個</span></p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">き久さん巻</p>
                <p className="font-display text-xl text-primary">¥660<span className="text-sm ml-1">税込/1本</span></p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto overflow-hidden glow-image order-1 lg:order-2">
            <img
              src="images/inari_maki_new.jpg"
              alt="忠さんいなり・き久さん巻"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-1 text-sm tracking-wider">
              伝統の味
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Space Section
function SpaceSection() {
  return (
    <AnimatedSection id="space" className="py-24 md:py-32 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-primary/80 text-sm tracking-[0.3em] mb-4">SPACE</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-gold-gradient">
            お部屋と空間
          </h2>
        </motion.div>

        {/* Main Image */}
        <motion.div variants={fadeInUp} className="mb-12">
          <div className="relative aspect-[21/9] overflow-hidden glow-image">
            <img
              src="images/concept_bg.jpg"
              alt="寿司忠の座敷"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-foreground/80 leading-relaxed text-lg">
            「武蔵の小京都」の異名をもつ小川町は、古くから料亭や旅館などが多く、芸者の街としての文化や歴史を感じさせる建物が多く残っています。
          </p>
          <p className="text-foreground/80 leading-relaxed text-lg mt-4">
            当料亭もその名残を残す、遊び心豊かなお部屋で食事を楽しんでいただけます。建具や内装の細部にまで宿る職人の技と、歴史を感じさせる落ち着いた空間で、至福のひとときをお過ごしください。
          </p>
        </motion.div>

        {/* Usage Scenes */}
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: "ご宴会・接待", desc: "最大100名様まで対応可能" },
            { title: "お祝い・顔合わせ", desc: "お食い初め、七五三、結納など" },
            { title: "ご法要", desc: "故人を偲ぶ大切なお席に" },
            { title: "デート・記念日", desc: "特別な日のお食事に" }
          ].map((scene, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 border border-border/30 hover:border-primary/30 transition-colors duration-500 text-center"
            >
              <h3 className="font-serif text-lg tracking-wider mb-2">{scene.title}</h3>
              <p className="text-muted-foreground text-sm">{scene.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Access Section
function AccessSection() {
  return (
    <AnimatedSection id="access" className="py-24 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-primary/80 text-sm tracking-[0.3em] mb-4">ACCESS</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-gold-gradient">
            アクセス
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl tracking-wider mb-6 text-gold-gradient">
                料亭 寿司忠
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground/90">〒355-0328</p>
                    <p className="text-foreground/90">埼玉県比企郡小川町大塚48</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:0493-72-0018" className="text-foreground/90 hover:text-primary transition-colors text-lg">
                      0493-72-0018
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground/90">営業時間: 11:00〜21:00</p>
                    <p className="text-muted-foreground text-sm">定休日: 月曜日</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider-gold" />

            <div>
              <h4 className="font-serif text-lg tracking-wider mb-4">交通アクセス</h4>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li>• JR八高線・東武東上線「小川町」駅より徒歩3分</li>
                <li>• 関越自動車道 嵐山小川ICより10〜15分</li>
                <li>• 専用駐車場17台完備</li>
              </ul>
            </div>

            <a
              href="https://maps.google.com/maps?q=埼玉県比企郡小川町大塚48"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold rounded-none inline-flex items-center gap-2"
            >
              Google Mapで見る
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Map */}
          <motion.div variants={fadeInUp}>
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden border border-border/30">
              <iframe
                src="https://maps.google.com/maps?q=%E5%9F%BC%E7%8E%89%E7%9C%8C%E6%AF%94%E4%BC%81%E9%83%A1%E5%B0%8F%E5%B7%9D%E7%94%BA%E5%A4%A7%E5%A1%9A48&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                title="Google Maps"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-border/30">
      <div className="container">
        <div className="text-center">
          <p className="font-serif text-2xl tracking-wider text-gold-gradient mb-4">
            寿司忠
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            明治43年創業 小川町の老舗料亭
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#concept" className="text-foreground/60 hover:text-primary transition-colors">寿司忠の心</a>
            <a href="#menu" className="text-foreground/60 hover:text-primary transition-colors">おしながき</a>
            <a href="#specialties" className="text-foreground/60 hover:text-primary transition-colors">名物</a>
            <a href="#space" className="text-foreground/60 hover:text-primary transition-colors">お部屋</a>
            <a href="#access" className="text-foreground/60 hover:text-primary transition-colors">アクセス</a>
          </div>

          <a
            href="tel:0493-72-0018"
            className="inline-block text-primary hover:text-primary/80 transition-colors text-lg tracking-wider mb-8"
          >
            0493-72-0018
          </a>

          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} 料亭 寿司忠. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ConceptSection />
        <MenuSection />
        <SpecialtiesSection />
        <SpaceSection />
        <AccessSection />
      </main>
      <Footer />
    </div>
  );
}
