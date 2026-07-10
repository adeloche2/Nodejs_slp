const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

const site = {
  name: 'أفق للخدمات الرقمية',
  description: 'موقع تعريفي بسيط وسريع مبني باستخدام Node.js بدون قواعد بيانات.',
};

const services = [
  {
    title: 'تصميم واجهات',
    description: 'واجهات عربية عصرية سهلة الاستخدام ومتجاوبة مع جميع الشاشات.',
    icon: '✨',
  },
  {
    title: 'تطوير مواقع',
    description: 'صفحات ثابتة وسريعة مناسبة للشركات الناشئة والمشاريع الشخصية.',
    icon: '💻',
  },
  {
    title: 'تحسين الأداء',
    description: 'تنظيم الملفات والصور والأنماط للحصول على تجربة تصفح أفضل.',
    icon: '⚡',
  },
];

const projects = [
  'صفحة تعريفية لشركة ناشئة',
  'موقع خدمات مستقل',
  'واجهة هبوط لحملة تسويقية',
];

const navigation = [
  { path: '/', label: 'الرئيسية' },
  { path: '/about', label: 'من نحن' },
  { path: '/services', label: 'الخدمات' },
  { path: '/contact', label: 'تواصل' },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLayout({ title, activePath, content }) {
  const navLinks = navigation
    .map((item) => {
      const activeClass = item.path === activePath ? 'active' : '';
      return `<a class="${activeClass}" href="${item.path}">${item.label}</a>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(site.description)}">
  <title>${escapeHtml(title)} | ${escapeHtml(site.name)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="navbar container" aria-label="التنقل الرئيسي">
      <a class="brand" href="/" aria-label="الصفحة الرئيسية"><span>أفق</span></a>
      <div class="nav-links">${navLinks}</div>
    </nav>
  </header>
  ${content}
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h2>${escapeHtml(site.name)}</h2>
        <p>${escapeHtml(site.description)}</p>
      </div>
      <div>
        <h3>روابط سريعة</h3>
        <a href="/about">من نحن</a>
        <a href="/services">الخدمات</a>
        <a href="/contact">تواصل معنا</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function renderServiceCards(useLargeCards = false) {
  return services
    .map((service) => `<article class="service-card ${useLargeCards ? 'large' : ''}">
      <span>${service.icon}</span>
      <h${useLargeCards ? '2' : '3'}>${escapeHtml(service.title)}</h${useLargeCards ? '2' : '3'}>
      <p>${escapeHtml(service.description)}</p>
    </article>`)
    .join('');
}

const pages = {
  '/': () => renderLayout({
    title: 'الرئيسية',
    activePath: '/',
    content: `<main>
      <section class="hero container">
        <div class="hero-content">
          <p class="eyebrow">حلول ويب بسيطة وفعالة</p>
          <h1>موقع Node.js متعدد الصفحات بدون قاعدة بيانات</h1>
          <p class="lead">واجهة عربية أنيقة ومتجاوبة مع الشاشات، مناسبة للتعريف بخدماتك أو مشروعك بسرعة.</p>
          <div class="hero-actions">
            <a class="button primary" href="/services">استعرض الخدمات</a>
            <a class="button secondary" href="/contact">ابدأ التواصل</a>
          </div>
        </div>
        <div class="hero-card" aria-label="ملخص الموقع">
          <span class="card-icon">🚀</span>
          <h2>سريع ومباشر</h2>
          <p>يعتمد على Node.js وملفات ثابتة فقط، بدون أي قاعدة بيانات.</p>
        </div>
      </section>
      <section class="section container">
        <div class="section-heading">
          <p class="eyebrow">ماذا نقدم؟</p>
          <h2>خدمات تساعدك على الظهور بشكل أفضل</h2>
        </div>
        <div class="cards-grid">${renderServiceCards()}</div>
      </section>
      <section class="section container split-section">
        <div>
          <p class="eyebrow">نماذج استخدام</p>
          <h2>يمكن تخصيصه لأي فكرة</h2>
          <p>هذا الهيكل مناسب كنقطة بداية لموقع تعريفي، صفحة خدمات، أو واجهة حملة تسويقية.</p>
        </div>
        <ul class="check-list">${projects.map((project) => `<li>${escapeHtml(project)}</li>`).join('')}</ul>
      </section>
    </main>`,
  }),
  '/about': () => renderLayout({
    title: 'من نحن',
    activePath: '/about',
    content: `<main class="page container">
      <p class="eyebrow">من نحن</p>
      <h1>نبني حضوراً رقمياً بسيطاً وواضحاً</h1>
      <p class="lead">نركز على تصميم مواقع خفيفة وسهلة التصفح، مع محتوى عربي منظم وتجربة استخدام مناسبة للموبايل والكمبيوتر.</p>
      <div class="stats-grid">
        <div><strong>4</strong><span>صفحات جاهزة</span></div>
        <div><strong>100%</strong><span>بدون قاعدة بيانات</span></div>
        <div><strong>RTL</strong><span>دعم كامل للعربية</span></div>
      </div>
    </main>`,
  }),
  '/services': () => renderLayout({
    title: 'الخدمات',
    activePath: '/services',
    content: `<main class="page container">
      <p class="eyebrow">الخدمات</p>
      <h1>خدمات مصممة لإطلاق موقعك بسرعة</h1>
      <div class="cards-grid page-cards">${renderServiceCards(true)}</div>
    </main>`,
  }),
  '/contact': () => renderLayout({
    title: 'تواصل معنا',
    activePath: '/contact',
    content: `<main class="page container contact-layout">
      <section>
        <p class="eyebrow">تواصل معنا</p>
        <h1>جاهز لتحويل فكرتك إلى موقع؟</h1>
        <p class="lead">هذه صفحة تواصل ثابتة بدون حفظ بيانات. يمكنك لاحقاً ربط النموذج ببريد إلكتروني أو خدمة خارجية.</p>
      </section>
      <form class="contact-form" action="#" method="post">
        <label>الاسم الكامل<input type="text" name="name" placeholder="اكتب اسمك"></label>
        <label>البريد الإلكتروني<input type="email" name="email" placeholder="name@example.com"></label>
        <label>رسالتك<textarea name="message" rows="5" placeholder="اكتب رسالتك هنا"></textarea></label>
        <button class="button primary" type="submit">إرسال الرسالة</button>
      </form>
    </main>`,
  }),
};

function serveStaticFile(requestPath, response) {
  const safePath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(publicDirectory, safePath.replace('/public', ''));

  if (!filePath.startsWith(publicDirectory)) {
    response.writeHead(403);
    response.end('Forbidden');
    return true;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return false;
  }

  const extension = path.extname(filePath);
  const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  };

  response.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(response);
  return true;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname.startsWith('/css/') || url.pathname.startsWith('/images/')) {
    if (serveStaticFile(url.pathname, response)) {
      return;
    }
  }

  const renderPage = pages[url.pathname];
  if (renderPage) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(renderPage());
    return;
  }

  response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(renderLayout({
    title: 'الصفحة غير موجودة',
    activePath: '',
    content: `<main class="page container not-found">
      <p class="eyebrow">خطأ 404</p>
      <h1>الصفحة غير موجودة</h1>
      <p class="lead">الرابط الذي طلبته غير متاح. يمكنك العودة إلى الصفحة الرئيسية.</p>
      <a class="button primary" href="/">العودة للرئيسية</a>
    </main>`,
  }));
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
