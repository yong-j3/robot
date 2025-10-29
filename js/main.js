// サービスカードにin-viewクラスを追加（スクロールまたは読み込み時）
$(document).ready(function () {
  const checkInView = function () {
    $('.service').each(function () {
      const $this = $(this);
      const elementTop = $this.offset().top;
      const elementBottom = elementTop + $this.outerHeight();
      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + $(window).height();

      // ビューポートに入った場合
      if (windowBottom > elementTop + 100 && windowTop < elementBottom - 100) {
        if (!$this.hasClass('in-view')) {
          $this.addClass('in-view');
        }
      }
    });
  };

  // 初回読み込み時とスクロール時にチェック
  $(window).on('scroll load', checkInView);
  checkInView(); // 初期状態もチェック

  // スクロールでinview要素にshowクラスを追加してアニメーション
  $(window).on('scroll', function () {
    $('.inview').each(function () {
      const $this = $(this);
      const rect = $this[0].getBoundingClientRect();

      if (rect.top < $(window).height() - 100) {
        $this.addClass('show');
      }
    });
  });
});

// サイドボタンの表示/非表示
document.addEventListener('DOMContentLoaded', () => {
  const sideBtn = document.getElementById('side-btn');

  const toggleSideBtn = () => {
    if (window.scrollY > 300) {
      sideBtn.style.right = '50px'; // 右端から50pxに表示
      sideBtn.style.opacity = '1';
    } else {
      sideBtn.style.right = '-200px'; // 画面外に退避して非表示
      sideBtn.style.opacity = '0';
    }
  };

  window.addEventListener('scroll', toggleSideBtn);
  toggleSideBtn(); // 初期状態もチェック
});

document.addEventListener('DOMContentLoaded', function () {
  // IntersectionObserver を使用
  const cards = document.querySelectorAll('.aivyl-meaning .card');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // 画面に入ったら "show" クラスを追加
        observer.unobserve(entry.target);  // 一度表示されたら監視を停止
      }
    });
  }, {
    threshold: 0.2 // 20% 以上がビューポートに表示されたら
  });

  // 監視を開始
  cards.forEach(card => {
    observer.observe(card); // 各カードを監視
  });
});

