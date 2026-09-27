import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import DevisTemplate from './components/DevisTemplate';
import heroImg from './assets/images/hero.png';
import substationImg from './assets/images/substation.png';
import infrastructureImg from './assets/images/infrastructure.png';

const API_URL = 'http://localhost:8000/api';
const STORAGE_URL = 'http://localhost:8000/storage';

const translations = {
  fr: {
    accueil: 'Accueil',
    services: 'Services',
    projets: 'Projets',
    contact: 'Contact',
    devis: 'Devis Gratuit',
    heroTitle: 'Expertise en Infrastructure Électrique',
    heroSubtitle: 'Propulser le futur avec des solutions énergétiques de nouvelle génération. Ingénierie avancée pour un monde connecté.',
    exp: "Ans d'expérience",
    poteaux: 'Poteaux & Réseaux',
    postes: 'Postes de Transformation',
    bt: 'Basse Tension',
    marches: 'Marchés Publics',
    send: 'Envoyer le Message',
    placeholderName: 'Votre Nom',
    placeholderEmail: 'Votre Email',
    placeholderMsg: 'Votre Message',
    placeholderDetails: 'Détails de votre projet',
    modalSubtitle: 'Remplissez ce formulaire et nous vous contacterons sous 24h.',
    faqTitle: 'Questions Fréquentes',
    reviewsTitle: 'Avis Clients',
    leaveReview: 'Laissez un avis',
    submitReview: 'Publier mon avis',
    commentPlaceholder: 'Votre commentaire ici...',
    status: 'STATUT SYSTÈME: EN LIGNE',
    addProject: 'Ajouter un Projet',
    projectTitle: 'Titre du Projet',
    projectDesc: 'Description du projet',
    projectLoc: 'Localisation',
    projectYear: 'Année',
    uploadImage: 'Télécharger une Image',
    adminLogin: 'Connexion Admin',
    monitoringTitle: 'MONITORING RÉSEAU v2.4',
    transformationTitle: 'TRANSFORMATION ÉNERGÉTIQUE',
    selectServices: 'Sélectionnez les services souhaités:',
    servicesList: ['Poteaux & Réseaux HT/MT', 'Postes de Transformation', 'Basse Tension (BT)', 'Éclairage Public', 'Études Techniques', 'Maintenance']
  },
  en: {
    accueil: 'Home',
    services: 'Services',
    projets: 'Projects',
    contact: 'Contact',
    devis: 'Free Quote',
    heroTitle: 'Electrical Infrastructure Expertise',
    heroSubtitle: 'Powering the future with next-generation energy solutions. Advanced engineering for a connected world.',
    exp: 'Years of Experience',
    poteaux: 'Poles & Networks',
    postes: 'Substations',
    bt: 'Low Voltage',
    marches: 'Public Markets',
    send: 'Send Message',
    placeholderName: 'Your Name',
    placeholderEmail: 'Your Email',
    placeholderMsg: 'Your Message',
    placeholderDetails: 'Project Details',
    modalSubtitle: 'Fill out this form and we will contact you within 24 hours.',
    faqTitle: 'Frequently Asked Questions',
    reviewsTitle: 'Client Reviews',
    leaveReview: 'Leave a review',
    submitReview: 'Submit Review',
    commentPlaceholder: 'Your comment here...',
    status: 'SYSTEM STATUS: ONLINE',
    addProject: 'Add a Project',
    projectTitle: 'Project Title',
    projectDesc: 'Project Description',
    projectLoc: 'Location',
    projectYear: 'Year',
    uploadImage: 'Upload Image',
    adminLogin: 'Admin Login',
    monitoringTitle: 'GRID MONITORING v2.4',
    transformationTitle: 'ENERGY TRANSFORMATION',
    selectServices: 'Select desired services:',
    servicesList: ['HT/MV Poles & Networks', 'Transformer Substations', 'Low Voltage (BT)', 'Public Lighting', 'Technical Studies', 'Maintenance']
  },
  ar: {
    accueil: 'الرئيسية',
    services: 'خدماتنا',
    projets: 'مشاريعنا',
    contact: 'اتصل بنا',
    devis: 'طلب عرض سعر',
    heroTitle: 'خبرة في البنية التحتية الكهربائية',
    heroSubtitle: 'ندفع المستقبل بحلول طاقة من الجيل القادم. هندسة متقدمة لعالم متصل.',
    exp: 'سنة من الخبرة',
    poteaux: 'الأعمدة والشبكات',
    postes: 'محطات التحويل',
    bt: 'الضغط المنخفض',
    marches: 'الصفقات العمومية',
    send: 'إرسال الرسالة',
    placeholderName: 'اسمك الكامل',
    placeholderEmail: 'بريدك الإلكتروني',
    placeholderMsg: 'رسالتك',
    placeholderDetails: 'تفاصيل مشروعك',
    modalSubtitle: 'املأ هذا النموذج وسنتصل بك في غضون 24 ساعة.',
    faqTitle: 'الأسئلة الشائعة',
    reviewsTitle: 'آراء العملاء',
    leaveReview: 'اترك رأيك',
    submitReview: 'نشر التقييم',
    commentPlaceholder: 'اكتب تعليقك هنا...',
    status: 'حالة النظام: متصل',
    addProject: 'إضافة مشروع',
    projectTitle: 'عنوان المشروع',
    projectDesc: 'وصف المشروع',
    projectLoc: 'الموقع',
    projectYear: 'السنة',
    uploadImage: 'تحميل صورة',
    adminLogin: 'دخول المسؤول',
    monitoringTitle: 'مراقبة الشبكة v2.4',
    transformationTitle: 'تحول الطاقة',
    selectServices: 'اختر الخدمات المطلوبة:',
    servicesList: ['الأعمدة والشبكات HT/MT', 'محطات التحويل', 'الضغط المنخفض (BT)', 'الإنارة العمومية', 'الدراسات التقنية', 'الصيانة']
  }
};

function App() {
  const [lang, setLang] = useState('fr');
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', location: '', year: '', image: null });
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [selectedServices, setSelectedServices] = useState([]);
  const [clientItems, setClientItems] = useState([]); // [{desc: '', qty: 1}]
  const [showAdminDevis, setShowAdminDevis] = useState(false);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [adminDevisData, setAdminDevisData] = useState({ clientName: '', clientEmail: '', items: [] });

  const t = translations[lang];

  useEffect(() => {
    fetchReviews();
    fetchProjects();
    if (isAdmin) fetchQuoteRequests();
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchQuoteRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact-requests`);
      setQuoteRequests(res.data);
    } catch (err) { console.error(err); }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === '1234') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPass('');
      fetchQuoteRequests();
      alert("Accès autorisé. Bienvenue, Administrateur.");
    } else {
      alert("Accès refusé. Code incorrect.");
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Confirmer la suppression de cet avis ?")) {
      try {
        await axios.post(`${API_URL}/reviews/delete/${id}`);
        fetchReviews();
      } catch (err) { alert("Erreur."); }
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm("Supprimer cette demande ?")) {
      try {
        await axios.post(`${API_URL}/contact-requests/delete/${id}`);
        fetchQuoteRequests();
      } catch (err) { alert("Erreur."); }
    }
  };

  const handleProcessRequest = (req) => {
    setAdminDevisData({
      clientName: req.name,
      clientEmail: req.email,
      items: req.items ? req.items.map(it => ({ ...it, unitPrice: 0 })) : []
    });
    setShowAdminDevis(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Confirmer la suppression de ce projet ?")) {
      try {
        await axios.post(`${API_URL}/projects/delete/${id}`);
        fetchProjects();
      } catch (err) { alert("Erreur."); }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('title', projectForm.title);
    data.append('description', projectForm.description);
    data.append('location', projectForm.location);
    data.append('year', projectForm.year);
    if (projectForm.image) data.append('image', projectForm.image);

    try {
      await axios.post(`${API_URL}/projects`, data);
      setProjectForm({ title: '', description: '', location: '', year: '', image: null });
      setShowProjectModal(false);
      fetchProjects();
      alert("Projet enregistré avec succès.");
    } catch (err) { alert("Erreur lors de l'enregistrement."); } finally { setLoading(false); }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleReviewChange = (e) => setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  const handleProjectInputChange = (e) => setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setProjectForm({ ...projectForm, image: e.target.files[0] });

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const addClientItem = () => setClientItems([...clientItems, { desc: '', qty: 1 }]);
  const updateClientItem = (idx, field, val) => {
    const newItems = [...clientItems];
    newItems[idx][field] = val;
    setClientItems(newItems);
  };
  const removeClientItem = (idx) => setClientItems(clientItems.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalItems = [
      ...selectedServices.map(s => ({ desc: s, qty: 1 })),
      ...clientItems.filter(item => item.desc.trim() !== '')
    ];
    try {
      await axios.post(`${API_URL}/contact`, { ...formData, items: finalItems, lang });
      alert("Demande envoyée !");
      setShowModal(false);
      setFormData({ name: '', email: '', service: '', message: '' });
      setSelectedServices([]);
      setClientItems([]);
    } catch (error) { alert("Erreur."); } finally { setLoading(false); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/reviews`, reviewForm);
      setReviewForm({ name: '', comment: '' });
      fetchReviews();
      alert("Avis publié !");
    } catch (err) { alert("Erreur."); }
  };

  return (
    <div className={`app-container ${lang === 'ar' ? 'rtl' : ''}`}>
      {/* Cyber Background Effects */}
      <div className="cyber-cursor" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <div className="energy-line" style={{ top: '15%', left: 0 }}></div>
      <div className="energy-line" style={{ top: '45%', right: 0, animationDirection: 'reverse' }}></div>
      <div className="energy-line" style={{ top: '75%', left: 0 }}></div>

      {/* Navbar */}
      <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="footer-logo glitch-text" data-text="BENDOUZELEC" onDoubleClick={() => setShowAdminModal(true)} style={{ cursor: 'pointer' }}>BENDOUZELEC</div>
        <ul style={{ display: 'flex', gap: '30px', listStyle: 'none' }}>
          <li><a href="#home" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>{t.accueil}</a></li>
          <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t.services}</a></li>
          <li><a href="#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t.projets}</a></li>
          <li><a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t.contact}</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'white', padding: '5px', borderRadius: '5px' }}>
            <option value="fr">FR</option><option value="en">EN</option><option value="ar">AR</option>
          </select>
          <button className="btn-primary" onClick={() => setShowModal(true)}>{t.devis}</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="hero-overlay" style={{ backgroundImage: `url(${heroImg})`, opacity: 0.3, filter: 'brightness(0.5)' }}></div>
        <div className="hero-content animate-fade-in">
          <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '8px', textTransform: 'uppercase', display: 'block', marginBottom: '20px', textShadow: '0 0 10px var(--primary)' }}>{t.status}</span>
          <h1 className="glitch-text" data-text={t.heroTitle}>{t.heroTitle}</h1>
          <p className="subtitle">{t.heroSubtitle}</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="#services" className="btn-primary" style={{ textDecoration: 'none' }}>{t.services}</a>
            <a href="#contact" className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--primary)', textDecoration: 'none' }}>{t.contact}</a>
          </div>
        </div>
      </header>

      {/* Monitoring Grid */}
      <section style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, #0a1128 100%)', padding: '100px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="glitch-text" data-text={t.monitoringTitle} style={{ fontSize: '2rem', color: 'var(--primary)' }}>{t.monitoringTitle}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[{ label: 'POWER LOAD', value: '84.2%', color: '#00f2ff' }, { label: 'GRID UPTIME', value: '99.99%', color: '#00ff9d' }, { label: 'TRANSFORMERS', value: 'ACTIVE', color: '#ffcc00' }, { label: 'NETWORK FREQ', value: '50.02 Hz', color: '#ff00ff' }].map((stat, i) => (
            <div key={i} className="glass" style={{ padding: '30px', borderRadius: '15px', textAlign: 'center', border: `1px solid ${stat.color}` }}>
              <div style={{ fontSize: '0.7rem', color: stat.color, letterSpacing: '2px', marginBottom: '10px' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{stat.value}</div>
              <div style={{ height: '4px', background: stat.color, width: '60%', margin: '15px auto 0', borderRadius: '2px', boxShadow: `0 0 10px ${stat.color}` }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        <div className="stats-container animate-fade-in" style={{ border: '1px solid var(--primary)', boxShadow: '0 0 30px rgba(0,242,255,0.1)' }}>
          <div className="stat-item"><span className="stat-number">30+</span><span className="stat-label">{t.exp}</span></div>
          <div className="stat-item"><span className="stat-number">500+</span><span className="stat-label">Pylônes</span></div>
          <div className="stat-item"><span className="stat-number">120+</span><span className="stat-label">Postes</span></div>
          <div className="stat-item"><span className="stat-number">98%</span><span className="stat-label">Intégrité</span></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '5px' }}>{t.services}</h2>
          <p style={{ color: 'var(--text-muted)' }}>Expertise technique de haut niveau pour vos infrastructures.</p>
        </div>
        <div className="services-grid">
          <div className="service-card cyber-card"><h3>{t.poteaux}</h3><p>Réseaux HT et MT.</p></div>
          <div className="service-card cyber-card"><h3>{t.postes}</h3><p>Design de sous-stations.</p></div>
          <div className="service-card cyber-card"><h3>{t.bt}</h3><p>Distribution basse tension.</p></div>
          <div className="service-card cyber-card"><h3>{t.marches}</h3><p>Marchés publics.</p></div>
        </div>
      </section>

      {/* Projects Section (Restored Premium Structure) */}
      <section id="projects" style={{ background: 'var(--surface)', borderRadius: '40px', margin: '100px 5%', border: '1px solid rgba(0, 242, 255, 0.1)', boxShadow: '0 0 50px rgba(0, 242, 255, 0.05)' }}>
        <div style={{ textAlign: 'center', paddingTop: '60px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '5px' }}>{t.projets}</h2>
          <p style={{ color: 'var(--text-muted)' }}>Découvrez nos réalisations majeures à travers le Royaume.</p>
          {isAdmin && <button onClick={() => setShowProjectModal(true)} className="btn-primary" style={{ marginTop: '20px' }}>+ {t.addProject}</button>}
        </div>

        <div style={{ padding: '0 80px 80px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {projects.length > 0 ? projects.map((proj, idx) => (
            <div key={proj.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center', direction: idx % 2 === 0 ? 'ltr' : 'rtl' }}>
              <div style={{ direction: 'ltr' }}>
                <h2 className="glitch-text" data-text={proj.title} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{proj.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.8' }}>{proj.description}</p>
                <div style={{ color: 'var(--primary)', fontWeight: 600 }}>📍 {proj.location} | 📅 {proj.year}</div>
                {isAdmin && <button onClick={() => handleDeleteProject(proj.id)} style={{ marginTop: '20px', background: '#ff4b2b', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>Supprimer</button>}
              </div>
              <div style={{ position: 'relative' }}>
                <img src={proj.image_path ? `${STORAGE_URL}/${proj.image_path}` : substationImg} alt={proj.title} style={{ width: '100%', borderRadius: '30px', boxShadow: '0 0 50px rgba(0, 242, 255, 0.3)', filter: 'brightness(0.9) contrast(1.1)' }} />
                <div className="glass" style={{ position: 'absolute', bottom: '-20px', right: idx % 2 === 0 ? '-20px' : 'auto', left: idx % 2 === 0 ? 'auto' : '-20px', padding: '25px', borderRadius: '15px', border: '1px solid var(--primary)', boxShadow: '0 0 30px var(--primary)' }}>
                  <p style={{ fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>{proj.title.toUpperCase()}</p>
                  <p style={{ fontSize: '0.8rem', color: 'white' }}>CORE PROJECT</p>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
              <div>
                <h2 className="glitch-text" data-text={t.transformationTitle} style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{t.transformationTitle}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.8' }}>Nous fusionnons l'ingénierie traditionnelle avec les technologies du futur pour créer un réseau électrique indestructible et intelligent.</p>
                <ul style={{ listStyle: 'none', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '15px' }}>⚡ Ingénierie de haute précision</li>
                  <li style={{ marginBottom: '15px' }}>⚡ Protocoles de sécurité avancés</li>
                </ul>
              </div>
              <div style={{ position: 'relative' }}>
                <img src={substationImg} alt="Sous-station" style={{ width: '100%', borderRadius: '30px', boxShadow: '0 0 50px rgba(0, 242, 255, 0.3)' }} />
              </div>
            </div>
          )}
        </div>
      </section>


      {/* FAQ & Reviews */}
      <section style={{ background: 'var(--surface)', padding: '100px 5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '60px' }} className="glitch-text" data-text={t.faqTitle}>{t.faqTitle}</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto 100px' }}>
          {lang === 'fr' ? (
            <>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Zones d'intervention ?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Nous couvrons tout le Maroc, avec une forte présence dans la région de Midelt.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Quels types de postes réalisez-vous ?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Nous réalisons des postes de transformation HT/MT, des postes préfabriqués et des cabines maçonnées conformes aux normes ONEE.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Délais pour une étude de projet ?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Généralement entre 3 à 7 jours ouvrables selon la complexité.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Maintenance après installation ?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Oui, nous proposons des contrats de maintenance préventive et curative.</p></details>
            </>
          ) : lang === 'ar' ? (
            <>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>مناطق التدخل؟</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>نغطي جميع أنحاء المغرب، مع تواجد قوي في منطقة ميدلت.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>ما هي أنواع المحطات التي تقومون بإنجازها؟</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>نقوم بإنجاز محطات التحويل الكهربائي ذات الضغط العالي والمتوسط وفق معايير المكتب الوطني للكهرباء.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>ما هي مدة دراسة المشروع؟</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>عادة ما تستغرق بين 3 إلى 7 أيام عمل حسب تعقيد المشروع.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>هل تقدمون خدمة الصيانة؟</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>نعم، نوفر عقود صيانة وقائية وعلاجية لجميع تركيباتنا.</p></details>
            </>
          ) : (
            <>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Intervention zones?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>We cover all of Morocco, with a strong presence in the Midelt region.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Types of substations?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>We build HV/MV transformer stations and prefabricated cabins according to ONEE standards.</p></details>
              <details style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}><summary style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--primary)', fontSize: '1.2rem' }}>Project study lead time?</summary><p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Usually between 3 to 7 working days depending on complexity.</p></details>
            </>
          )}
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>{t.reviewsTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} className="glass" style={{ padding: '40px', borderRadius: '30px', position: 'relative' }}>
              {isAdmin && <button onClick={() => handleDeleteReview(rev.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ff4b2b', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>×</button>}
              <p style={{ fontStyle: 'italic', marginBottom: '25px', fontSize: '1.1rem' }}>"{rev.comment}"</p>
              <p style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>- {rev.name}</p>
            </div>
          ))}
        </div>

        <div className="glass" style={{ maxWidth: '700px', margin: '0 auto', padding: '50px', borderRadius: '40px', border: '1px solid var(--primary)', boxShadow: '0 0 40px rgba(0, 242, 255, 0.1)' }}>
          <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>{t.leaveReview}</h3>
          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" name="name" required value={reviewForm.name} onChange={handleReviewChange} placeholder={t.placeholderName} style={{ padding: '18px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }} />
            <textarea name="comment" required value={reviewForm.comment} onChange={handleReviewChange} placeholder={t.commentPlaceholder} rows="4" style={{ padding: '18px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }}></textarea>
            <button className="btn-primary" type="submit" style={{ padding: '18px' }}>{t.submitReview}</button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '120px 5%' }}>
        <div className="glass" style={{ padding: '80px', borderRadius: '50px', border: '1px solid var(--primary)', boxShadow: '0 0 50px rgba(0, 242, 255, 0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }}>
            <div>
              <h2 className="glitch-text" data-text={t.contact}>{t.contact}</h2>
              <div style={{ marginTop: '40px', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>📍 Midelt, Maroc</p><p>📞 +212 6 14 61 67 60</p><p>✉️ aymanebendouz54@gmail.com</p>
              </div>
              <div style={{ marginTop: '50px', borderRadius: '30px', overflow: 'hidden', height: '350px', border: '1px solid var(--primary)', boxShadow: '0 0 30px rgba(0, 242, 255, 0.2)' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13543.682662243764!2d-4.74780655!3d32.6845348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd97463f68d6c77f%3A0x6b1f1f5f3f3f3f3f!2sMidelt!5e0!3m2!1sfr!2sma!4v1715545000000!5m2!1sfr!2sma" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder={t.placeholderName} style={{ padding: '20px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }} />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder={t.placeholderEmail} style={{ padding: '20px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }} />
              <textarea name="message" required value={formData.message} onChange={handleInputChange} placeholder={t.placeholderMsg} rows="8" style={{ padding: '20px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'white' }}></textarea>
              <button className="btn-primary" type="submit" disabled={loading} style={{ padding: '20px', fontSize: '1.1rem' }}>{loading ? '...' : t.send}</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '80px', borderTop: '1px solid var(--border)', background: 'var(--bg-dark)' }}>
        <div className="footer-logo glitch-text" data-text="BENDOUZELEC" style={{ marginBottom: '30px', fontSize: '2rem' }}>BENDOUZELEC</div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', letterSpacing: '2px' }}>© 2026 BENDOUZELEC CORE. POWERED BY ANTIGRAVITY.</p>
        <button onClick={() => setShowAdminModal(true)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>Espace Admin</button>
      </footer>

      {/* Admin Modals */}
      {showAdminModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass animate-fade-in" style={{ padding: '50px', borderRadius: '40px', border: '1px solid var(--primary)', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>{t.adminLogin}</h3>
            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="password" placeholder="Code Secret" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} style={{ padding: '18px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', color: 'white' }} />
              <button className="btn-primary" type="submit" style={{ padding: '15px' }}>Accéder</button>
              <button type="button" onClick={() => setShowAdminModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Annuler</button>
              {isAdmin && (
                <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--primary)' }}>DEMANDES CLIENTS</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                    {quoteRequests.map(req => (
                      <div key={req.id} className="glass" style={{ padding: '15px', fontSize: '0.8rem', position: 'relative' }}>
                        <p><strong>{req.name}</strong> ({req.email})</p>
                        <p style={{ color: '#888', margin: '5px 0' }}>{req.items?.map(it => `${it.desc} (x${it.qty})`).join(', ')}</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button onClick={() => handleProcessRequest(req)} style={{ background: 'var(--primary)', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 800 }}>GÉNÉRER DEVIS</button>
                          <button onClick={() => handleDeleteRequest(req.id)} style={{ background: '#ff4b2b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setIsAdmin(false)} style={{ color: '#ff4b2b', background: 'none', border: 'none', cursor: 'pointer', marginTop: '20px', width: '100%' }}>Déconnexion</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Admin Devis Management Modal */}
      {showAdminDevis && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.98)', zIndex: 4000, overflowY: 'auto', padding: '40px 5%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h2 className="glitch-text" data-text="ADMIN: GÉNÉRATEUR DE DEVIS">ADMIN: GÉNÉRATEUR DE DEVIS</h2>
            <button onClick={() => setShowAdminDevis(false)} className="btn-primary" style={{ background: '#ff4b2b', border: 'none' }}>Quitter</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '40px' }}>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', height: 'fit-content' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Infos Client & Articles</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Nom Client" value={adminDevisData.clientName} onChange={(e) => setAdminDevisData({ ...adminDevisData, clientName: e.target.value })} style={{ padding: '12px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: 'white' }} />
                <input type="email" placeholder="Email Client" value={adminDevisData.clientEmail} onChange={(e) => setAdminDevisData({ ...adminDevisData, clientEmail: e.target.value })} style={{ padding: '12px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: 'white' }} />

                <hr style={{ border: '0.5px solid #333', margin: '10px 0' }} />
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Ajouter un article:</p>
                <button onClick={() => setAdminDevisData({ ...adminDevisData, items: [...adminDevisData.items, { desc: "Nouveau Service", qty: 1, unitPrice: 0 }] })} className="btn-primary" style={{ padding: '10px', fontSize: '0.8rem' }}>+ Ajouter Ligne</button>

                {adminDevisData.items.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input type="text" value={item.desc} onChange={(e) => {
                      const newItems = [...adminDevisData.items];
                      newItems[idx].desc = e.target.value;
                      setAdminDevisData({ ...adminDevisData, items: newItems });
                    }} placeholder="Description" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #444', color: 'white', fontSize: '0.8rem' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="number" value={item.qty} onChange={(e) => {
                        const newItems = [...adminDevisData.items];
                        newItems[idx].qty = parseInt(e.target.value);
                        setAdminDevisData({ ...adminDevisData, items: newItems });
                      }} style={{ width: '50px', background: 'transparent', border: 'none', borderBottom: '1px solid #444', color: 'white' }} />
                      <input type="number" value={item.unitPrice} onChange={(e) => {
                        const newItems = [...adminDevisData.items];
                        newItems[idx].unitPrice = parseFloat(e.target.value);
                        setAdminDevisData({ ...adminDevisData, items: newItems });
                      }} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid #444', color: 'white' }} />
                      <button onClick={() => setAdminDevisData({ ...adminDevisData, items: adminDevisData.items.filter((_, i) => i !== idx) })} style={{ color: '#ff4b2b', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => window.print()} className="btn-primary" style={{ width: '100%', marginTop: '30px' }}>Imprimer le Devis Final</button>
            </div>

            <div>
              <DevisTemplate data={adminDevisData} />
            </div>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass animate-fade-in" style={{ padding: '50px', borderRadius: '40px', border: '1px solid var(--primary)', maxWidth: '700px', width: '100%' }}>
            <h3 style={{ marginBottom: '30px' }}>{t.addProject}</h3>
            <form onSubmit={handleProjectSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" name="title" required placeholder={t.projectTitle} value={projectForm.title} onChange={handleProjectInputChange} />
              <input type="text" name="location" placeholder={t.projectLoc} value={projectForm.location} onChange={handleProjectInputChange} />
              <input type="text" name="year" placeholder={t.projectYear} value={projectForm.year} onChange={handleProjectInputChange} />
              <input type="file" onChange={handleFileChange} style={{ padding: '10px', color: 'white' }} />
              <textarea name="description" required placeholder={t.projectDesc} value={projectForm.description} onChange={handleProjectInputChange} style={{ gridColumn: 'span 2' }} rows="5"></textarea>
              <button className="btn-primary" type="submit" disabled={loading} style={{ gridColumn: 'span 2' }}>{loading ? '...' : t.addProject}</button>
              <button type="button" onClick={() => setShowProjectModal(false)} style={{ gridColumn: 'span 2', background: 'transparent', color: 'white', border: 'none' }}>Annuler</button>
            </form>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 2500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass" style={{ padding: '50px', borderRadius: '40px', border: '1px solid var(--primary)', maxWidth: '600px', width: '100%' }}>
            <button onClick={() => setShowModal(false)} style={{ float: 'right', color: 'white', fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
            <h2 className="glitch-text" data-text={t.devis}>{t.devis}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{t.modalSubtitle}</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder={t.placeholderName} />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder={t.placeholderEmail} />
              <textarea name="message" required value={formData.message} onChange={handleInputChange} placeholder={t.placeholderDetails} rows="4"></textarea>

              <div style={{ margin: '10px 0' }}>
                <p style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.9rem' }}>{t.selectServices}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {t.servicesList.map((s, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(s)}
                        onChange={() => handleServiceToggle(s)}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ margin: '15px 0' }}>
                <p style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.9rem' }}>Détails spécifiques (Câbles, Pylônes, etc.):</p>
                {clientItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input type="text" placeholder="Article (ex: Cable 10m)" value={item.desc} onChange={(e) => updateClientItem(i, 'desc', e.target.value)} style={{ flex: 3, padding: '10px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: 'white' }} />
                    <input type="number" value={item.qty} onChange={(e) => updateClientItem(i, 'qty', e.target.value)} style={{ flex: 1, padding: '10px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: 'white' }} />
                    <button type="button" onClick={() => removeClientItem(i)} style={{ color: '#ff4b2b', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={addClientItem} style={{ background: 'transparent', border: '1px dashed var(--primary)', color: 'var(--primary)', padding: '8px', borderRadius: '5px', width: '100%', fontSize: '0.8rem' }}>+ Ajouter un article spécifique</button>
              </div>

              <button className="btn-primary" type="submit" disabled={loading} style={{ padding: '20px' }}>
                {loading ? '...' : t.devis}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;