"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ============ TYPES ============
interface CaseStudy {
  id: number;
  niche: string;
  subscribers: string;
  ctrBefore: string;
  ctrAfter: string;
  improvement: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ============ DATA ============
const PLACEHOLDER_IMAGE = "https://i.imgur.com/50ZRqzH.jpeg";

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    niche: "Tech-обзоры",
    subscribers: "2.1M подписчиков",
    ctrBefore: "3.2%",
    ctrAfter: "12.8%",
    improvement: "+300%",
    description: "Полный редизайн визуального стиля канала. Внедрили контрастные цвета и читаемую типографику.",
    beforeImage: PLACEHOLDER_IMAGE,
    afterImage: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    niche: "Gaming",
    subscribers: "890K подписчиков",
    ctrBefore: "4.1%",
    ctrAfter: "15.3%",
    improvement: "+273%",
    description: "Создали узнаваемый стиль с эмоциональными лицами и динамичной композицией.",
    beforeImage: PLACEHOLDER_IMAGE,
    afterImage: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    niche: "Бизнес и финансы",
    subscribers: "1.5M подписчиков",
    ctrBefore: "2.8%",
    ctrAfter: "11.5%",
    improvement: "+311%",
    description: "Минималистичный премиальный стиль с акцентом на заголовки и цифры.",
    beforeImage: PLACEHOLDER_IMAGE,
    afterImage: PLACEHOLDER_IMAGE,
  },
];

const portfolioCategories = ["Все", "Tech", "Gaming", "Lifestyle", "Бизнес", "Образование"];

const pricingTiers: PricingTier[] = [
  {
    name: "Старт",
    price: "$30",
    description: "Идеально для первого знакомства",
    features: [
      "1 вариант обложки",
      "2 раунда правок",
      "Исходник в PNG/PSD",
      "Срок: 24-48 часов",
    ],
    cta: "Попробовать",
  },
  {
    name: "Про",
    price: "$75",
    description: "Для тех, кто хочет результат",
    features: [
      "3 варианта для A/B теста",
      "Безлимитные правки",
      "A/B тест стратегия",
      "Анализ конкурентов",
      "Срок: 12-24 часа",
      "Приоритетная поддержка",
    ],
    popular: true,
    cta: "Выбрать",
  },
  {
    name: "Пакет",
    price: "$500",
    period: "/месяц",
    description: "Для серьёзных каналов",
    features: [
      "10 обложек в месяц",
      "Полный A/B анализ",
      "Консультации по CTR",
      "Редизайн старых видео",
      "Личный менеджер",
      "Отчёты по эффективности",
    ],
    cta: "Обсудить",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Как работает A/B тестирование на YouTube?",
    answer: "YouTube позволяет загружать несколько вариантов обложек для одного видео. Платформа автоматически показывает разные варианты зрителям и собирает данные о CTR. Через несколько дней алгоритм выбирает победителя — обложку с лучшей конверсией.",
  },
  {
    question: "Сколько времени занимает одна обложка?",
    answer: "Базовый вариант готов за 24-48 часов. Для тарифа Про мы работаем быстрее — 12-24 часа. Срочные заказы обсуждаются индивидуально и выполняются за 4-6 часов.",
  },
  {
    question: "Что если обложка не понравится?",
    answer: "Мы включаем раунды правок во все тарифы. В тарифе Про правки безлимитные — работаем до полного удовлетворения. Если по какой-то причине вы недовольны результатом, вернём деньги.",
  },
  {
    question: "Работаете с англоязычными каналами?",
    answer: "Да, более 60% наших клиентов — англоязычные каналы. Работаем со всеми языками и понимаем специфику разных рынков.",
  },
  {
    question: "Какие материалы нужны от меня?",
    answer: "Минимум — тема видео и желаемый стиль. В идеале — референсы, которые вам нравятся, фото для обложки (если нужны), и информация о вашей целевой аудитории.",
  },
  {
    question: "Почему стоит работать именно с вами?",
    answer: "Мы не просто рисуем красивые картинки — мы создаём обложки, которые работают. Каждая обложка основана на данных: анализ конкурентов, тренды ниши, психология кликов. Результаты наших клиентов говорят сами за себя.",
  },
];

// ============ COMPONENTS ============

// Urgency Badge Component
function UrgencyBadge({ className = "" }: { className?: string }) {
  const [slots, setSlots] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlots(prev => prev === 2 ? 3 : prev - 0.01 > 2 ? Math.floor(prev - 0.01) : 2);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-sm ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-neutral-300">
        Свободные слоты: <span className="text-white font-medium">{slots} из 5</span>
      </span>
    </motion.div>
  );
}

// Header Component
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Портфолио", href: "#portfolio" },
    { label: "Кейсы", href: "#cases" },
    { label: "Тарифы", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-white/5" : ""
      }`}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm">CT</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              CTR<span className="text-emerald-400">Studio</span>
            </span>
          </motion.a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                whileHover={{ y: -1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <UrgencyBadge className="hidden lg:flex" />
            <motion.a
              href="#cta"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm rounded-full transition-all hover:shadow-lg hover:shadow-emerald-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Заказать
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Animated Counter
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Section Wrapper with scroll animation
function Section({
  children,
  className = "",
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`relative py-20 md:py-32 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { value: 10000, suffix: "+", label: "Обложек создано" },
    { value: 400, suffix: "%", label: "Средний рост CTR" },
    { value: 500, suffix: "+", label: "Довольных клиентов" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-6"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              A/B тестирование включено
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="block">YouTube обложки,</span>
              <span className="block gradient-text">которые взрывают CTR</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-8 leading-relaxed">
              A/B тестирование каждой обложки. Гарантированный рост просмотров.
              Мы не гадаем — мы доказываем результат данными.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-emerald-500/25 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Начать сейчас
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#cases"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 hover:border-white/20 text-white font-medium rounded-full transition-all hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
              >
                Смотреть кейсы
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main thumbnail card */}
              <motion.div
                className="relative rounded-2xl overflow-hidden glow-border"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="Hero Thumbnail"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* YouTube play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                className="absolute -top-4 -right-4 md:-right-8 glass-card rounded-xl p-3 md:p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-400">+312%</div>
                    <div className="text-xs text-neutral-500">CTR рост</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 md:-left-8 glass-card rounded-xl p-3 md:p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">2.4M</div>
                    <div className="text-xs text-neutral-500">Просмотров</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-2 md:-right-12 glass-card rounded-xl p-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 border-2 border-black" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">+500 каналов</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 md:mt-32"
        >
          <p className="text-center text-sm text-neutral-500 mb-8">Нам доверяют каналы с миллионами подписчиков</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 rounded bg-white/10 flex items-center justify-center">
                <span className="text-xs text-neutral-500">LOGO {i}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Before/After Slider Component
function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleGlobalMouseUp = () => { isDragging.current = false; };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill className="object-cover" />
        <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-black text-xs font-medium rounded">
          После
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={beforeImage} alt="Before" fill className="object-cover" />
        <div className="absolute top-3 left-3 px-2 py-1 bg-neutral-700 text-white text-xs font-medium rounded">
          До
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Cases Section
function CasesSection() {
  return (
    <Section id="cases" className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Реальные результаты
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            A/B тесты, которые <span className="gradient-text">доказывают</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Каждый кейс — это реальный канал с измеримым ростом CTR после наших обложек
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <BeforeAfterSlider
                  beforeImage={study.beforeImage}
                  afterImage={study.afterImage}
                />
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full">
                    {study.niche}
                  </span>
                  <span className="text-neutral-500 text-sm">{study.subscribers}</span>
                </div>

                <motion.div
                  className="inline-block mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-5xl md:text-6xl font-bold gradient-text">
                    {study.improvement}
                  </span>
                  <span className="text-xl text-neutral-400 ml-2">CTR</span>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-sm text-neutral-500 mb-1">CTR до</div>
                    <div className="text-2xl font-bold text-neutral-400">{study.ctrBefore}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4 glow-border">
                    <div className="text-sm text-neutral-500 mb-1">CTR после</div>
                    <div className="text-2xl font-bold text-emerald-400">{study.ctrAfter}</div>
                  </div>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xl md:text-2xl text-neutral-400 mt-20 font-light"
        >
          Это не исключения. <span className="text-white font-medium">Это система.</span>
        </motion.p>
      </div>
    </Section>
  );
}

// Portfolio Section
function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [showAll, setShowAll] = useState(false);

  const portfolioItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: PLACEHOLDER_IMAGE,
    category: portfolioCategories[Math.floor(Math.random() * (portfolioCategories.length - 1)) + 1],
  }));

  const filteredItems = activeCategory === "Все"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  return (
    <Section id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Портфолио
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Более <span className="gradient-text">10,000</span> обложек
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-emerald-500 text-black font-medium"
                    : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, index) => {
              // Create varied sizes for bento effect
              const isLarge = index === 0 || index === 5;
              const isTall = index === 2 || index === 7;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                    isLarge ? "col-span-2 row-span-2" : ""
                  } ${isTall && !isLarge ? "row-span-2" : ""}`}
                >
                  <div className={`relative ${isLarge ? "aspect-square" : isTall ? "aspect-[9/16]" : "aspect-video"}`}>
                    <Image
                      src={item.image}
                      alt={`Portfolio ${item.id}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <span className="text-xs text-emerald-400 font-medium">{item.category}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-sm text-white">Смотреть</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show more button */}
        {filteredItems.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-white/20 text-white font-medium rounded-full transition-all hover:bg-white/5"
              whileHover={{ scale: 1.02 }}
            >
              {showAll ? "Показать меньше" : "Показать больше"}
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: showAll ? 180 : 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}
      </div>
    </Section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Загрузка вариантов",
      description: "Мы создаём 3 уникальных варианта обложки для вашего видео. Каждый вариант оптимизирован под разные триггеры внимания.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "YouTube тестирует",
      description: "YouTube автоматически показывает разные обложки разным зрителям и собирает данные о кликах в реальном времени.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Алгоритм выбирает",
      description: "Через несколько дней YouTube определяет победителя — обложку с наивысшим CTR. Никаких догадок, только данные.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Рост просмотров",
      description: "Ваш контент получает больше кликов, больше просмотров, больше подписчиков. ROI измеримый и доказуемый.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Процесс
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Как работает <span className="gradient-text">A/B тестирование</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            YouTube сам выбирает лучшую обложку на основе реальных данных о кликах
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <motion.div
                  className="glass-card rounded-2xl p-6 h-full group hover:bg-white/5 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                      {step.icon}
                    </div>
                    <span className="text-4xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Pricing Section
function PricingSection() {
  return (
    <Section id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Инвестиция в рост
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Выберите свой <span className="gradient-text">уровень</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Каждый тариф — это инвестиция в рост вашего канала с измеримым ROI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-emerald-500 text-black text-sm font-medium rounded-full">
                    Популярный
                  </span>
                </div>
              )}

              <motion.div
                className={`relative glass-card rounded-2xl p-6 lg:p-8 h-full ${
                  tier.popular
                    ? "border border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                    : "border border-white/5"
                }`}
                whileHover={{ scale: tier.popular ? 1.02 : 1.01 }}
              >
                {tier.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
                )}

                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-neutral-400 text-sm mb-6">{tier.description}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl lg:text-5xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-neutral-500">{tier.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#cta"
                    className={`block w-full py-3 px-6 rounded-full text-center font-medium transition-all ${
                      tier.popular
                        ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tier.cta}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-neutral-500 mb-4">Принимаем к оплате</p>
          <div className="flex justify-center items-center gap-6">
            {["Visa", "MC", "PayPal", "Crypto"].map((method) => (
              <div key={method} className="w-12 h-8 rounded bg-white/5 flex items-center justify-center">
                <span className="text-xs text-neutral-400">{method}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass-card rounded-xl p-5 text-left hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium text-lg group-hover:text-emerald-400 transition-colors">
                    {item.question}
                  </h3>
                  <motion.svg
                    className="w-5 h-5 text-neutral-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-neutral-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Final CTA Section
function CTASection() {
  return (
    <Section id="cta" className="overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <UrgencyBadge className="mx-auto mb-8" />

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Готовы к <span className="gradient-text">росту</span>?
          </h2>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Каждый день без оптимизированных обложек — это упущенные просмотры.
            Начните прямо сейчас.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-lg rounded-full transition-all hover:shadow-xl hover:shadow-emerald-500/25 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Написать в Telegram
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <motion.a
              href="mailto:hello@ctrstudio.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-neutral-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@ctrstudio.com
            </motion.a>
          </div>

          <p className="text-sm text-neutral-500">
            Отвечаю в течение <span className="text-white">2 часов</span> в рабочее время
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm">CT</span>
            </div>
            <span className="font-semibold">
              CTR<span className="text-emerald-400">Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Telegram
            </a>
            <a
              href="mailto:hello@ctrstudio.com"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} CTR Studio. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN PAGE ============
export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <CasesSection />
      <PortfolioSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
