// ==================== المتغيرات ====================
        
        // =============== غيّر كلمة السر هنا ===============
        const CORRECT_PASSWORD = '1234';
        // =================================================

        // الأغاني
        const songs = [
            { title: 'All I Want for Christmas Is You', artist: 'Mariah Carey', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { title: 'Last Christmas', artist: 'Wham!', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
            { title: 'Jingle Bell Rock', artist: 'Bobby Helms', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        ];

        // الصور
        const photos = [
            { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop', caption: 'لحظات لا تُنسى 💕' },
            { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop', caption: 'معاً للأبد 💑' },
            { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop', caption: 'كريسماس مع حبيبي 🎄' },
            { url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=400&fit=crop', caption: 'أجمل الذكريات ❤️' },
            { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop', caption: 'حب بلا حدود 💗' },
            { url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=400&h=400&fit=crop', caption: 'سعادة لا توصف 🌟' },
        ];

        // الذكريات
        const memories = [
            { title: 'أول مرة شفتك', date: 'يوم لا يُنسى', description: 'اللحظة اللي غيرت حياتي للأبد، شفتك وقلبي وقف ثانية وبعدين بدأ ينبض بحبك', icon: '❤️', color: 'from-rose to-soft-pink' },
            { title: 'أول موعد', date: 'بداية القصة', description: 'كان أحلى يوم، اتكلمنا وضحكنا وعرفت إنك الشخص اللي كنت بدور عليه', icon: '☕', color: 'from-gold-accent to-rose' },
            { title: 'أول هدية', date: 'مفاجأة حلوة', description: 'الهدية مش هي المهمة، المهم الحب اللي فيها والتفكير فيا', icon: '🎁', color: 'from-soft-pink to-blush' },
            { title: 'أول رحلة سوا', date: 'مغامرة جميلة', description: 'سافرنا مع بعض واكتشفنا العالم سوا، كل مكان بقى أحلى معاك', icon: '📍', color: 'from-rose to-gold-accent' },
            { title: 'أغنيتنا المفضلة', date: 'لحن الحب', description: 'كل ما بسمعها بفتكرك وبحس إنك جنبي حتى لو بعيد', icon: '🎵', color: 'from-blush to-rose' },
            { title: 'كريسماس الأول', date: 'أحلى عيد', description: 'أول كريسماس نقضيه مع بعض، بيتنا اتملى فرحة ودفء حبنا', icon: '⭐', color: 'from-gold-accent to-soft-pink' },
        ];

        // المناسبات
        const specialDates = [
            { title: 'ذكرى أول لقاء', date: '02/14', icon: '❤️' },
            { title: 'عيد ميلادك', date: '06/15', icon: '🎂' },
            { title: 'الكريسماس', date: '12/25', icon: '🎁' },
            { title: 'رأس السنة', date: '01/01', icon: '📅' },
        ];

        // الاقتباسات
        const quotes = [
            { text: 'أنت أجمل صدفة في حياتي', author: 'قلبي' },
            { text: 'معك عرفت إن الحب مش كلام، الحب فعل وإحساس', author: 'روحي' },
            { text: 'كل يوم بحبك أكتر من اللي قبله', author: 'عقلي' },
            { text: 'أنت مش بس حبيبي، أنت نص الثاني', author: 'كياني' },
            { text: 'لو الدنيا كلها اتجمعت ضدي، يكفيني إنك معايا', author: 'إيماني' },
            { text: 'ابتسامتك بتنور كل أيامي', author: 'عيوني' },
        ];

        let currentSongIndex = 0;
        let isPlaying = false;
        let isMuted = false;
        let currentQuote = 0;
        let currentLightboxIndex = 0;

        // ==================== وظائف الرسالة ====================
        function openEnvelope() {
            const flap = document.getElementById('envelope-flap');
            const paper = document.getElementById('letter-paper');
            const hint = document.getElementById('click-hint');
            const loading = document.getElementById('loading-text');
            const seal = document.getElementById('heart-seal');

            if (!flap.classList.contains('open')) {
                flap.classList.add('open');
                seal.style.transform = 'translateX(-50%) scale(0)';
                seal.style.transition = 'transform 0.5s ease';
                
                setTimeout(() => {
                    paper.classList.add('rise');
                    paper.style.opacity = '1';
                }, 600);

                hint.classList.add('hidden');
                loading.classList.remove('hidden');

                setTimeout(() => {
                    document.getElementById('letter-screen').classList.add('hidden');
                    document.getElementById('password-screen').classList.remove('hidden');
                    createFloatingHearts('floating-hearts-password');
                }, 4000);
            }
        }

        // ==================== وظائف الباسورد ====================
        function checkPassword(e) {
            e.preventDefault();
            const input = document.getElementById('password-input');
            const card = document.getElementById('password-card');
            const error = document.getElementById('error-message');
            const lockIcon = document.getElementById('lock-icon');

            if (input.value === CORRECT_PASSWORD) {
                document.getElementById('password-screen').classList.add('hidden');
                document.getElementById('main-screen').classList.remove('hidden');
                initMainPage();
            } else {
                error.classList.remove('hidden');
                lockIcon.textContent = '🔒';
                card.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    card.style.animation = '';
                    lockIcon.textContent = '❤️';
                }, 500);
            }
        }

        // ==================== وظائف الصفحة الرئيسية ====================
        function initMainPage() {
            createFloatingHearts('floating-hearts-main');
            initMusicPlayer();
            initCountdown();
            initPhotoGallery();
            initMemories();
            initSpecialDates();
            initQuotes();
        }

        // ==================== القلوب المتحركة ====================
        function createFloatingHearts(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            
            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '♥';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.fontSize = (15 + Math.random() * 25) + 'px';
                heart.style.animationDelay = Math.random() * 5 + 's';
                heart.style.animationDuration = (4 + Math.random() * 4) + 's';
                container.appendChild(heart);
            }
        }

        // ==================== مشغل الموسيقى ====================
        function initMusicPlayer() {
            const audio = document.getElementById('audio-player');
            audio.src = songs[currentSongIndex].url;
            audio.volume = 0.5;
            updateSongInfo();

            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                document.getElementById('progress-fill').style.width = progress + '%';
            });

            audio.addEventListener('ended', () => nextSong());
        }

        function updateSongInfo() {
            document.getElementById('song-title').textContent = songs[currentSongIndex].title;
            document.getElementById('song-artist').textContent = songs[currentSongIndex].artist;
        }

        function togglePlay() {
            const audio = document.getElementById('audio-player');
            const btn = document.getElementById('play-btn');
            const icon = document.getElementById('music-icon');

            if (isPlaying) {
                audio.pause();
                btn.textContent = '▶️';
                icon.classList.remove('animate-gentle-pulse');
            } else {
                audio.play();
                btn.textContent = '⏸️';
                icon.classList.add('animate-gentle-pulse');
            }
            isPlaying = !isPlaying;
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            const audio = document.getElementById('audio-player');
            audio.src = songs[currentSongIndex].url;
            updateSongInfo();
            if (isPlaying) audio.play();
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            const audio = document.getElementById('audio-player');
            audio.src = songs[currentSongIndex].url;
            updateSongInfo();
            if (isPlaying) audio.play();
        }

        function toggleMute() {
            const audio = document.getElementById('audio-player');
            const icon = document.getElementById('volume-icon');
            isMuted = !isMuted;
            audio.muted = isMuted;
            icon.textContent = isMuted ? '🔇' : '🔊';
        }

        function changeVolume(value) {
            const audio = document.getElementById('audio-player');
            audio.volume = value / 100;
        }

        // ==================== العداد التنازلي ====================
        function initCountdown() {
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }

        function updateCountdown() {
            const target = new Date('2025-01-01T00:00:00');
            const now = new Date();
            const diff = target - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
                document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
            }
        }

        // ==================== معرض الصور ====================
        function initPhotoGallery() {
            const grid = document.getElementById('photo-grid');
            grid.innerHTML = '';

            photos.forEach((photo, index) => {
                const item = document.createElement('div');
                item.className = 'photo-item animate-scale-bounce';
                item.style.animationDelay = (index * 0.1) + 's';
                item.innerHTML = `
                    <img src="${photo.url}" alt="${photo.caption}">
                    <div class="photo-overlay">
                        <span class="photo-caption">${photo.caption}</span>
                    </div>
                `;
                item.onclick = () => openLightbox(index);
                grid.appendChild(item);
            });
        }

        function openLightbox(index) {
            currentLightboxIndex = index;
            document.getElementById('lightbox-image').src = photos[index].url;
            document.getElementById('lightbox-caption').textContent = photos[index].caption;
            document.getElementById('lightbox').classList.remove('hidden');
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.add('hidden');
        }

        function navigateLightbox(direction) {
            if (direction === 'next') {
                currentLightboxIndex = (currentLightboxIndex + 1) % photos.length;
            } else {
                currentLightboxIndex = (currentLightboxIndex - 1 + photos.length) % photos.length;
            }
            document.getElementById('lightbox-image').src = photos[currentLightboxIndex].url;
            document.getElementById('lightbox-caption').textContent = photos[currentLightboxIndex].caption;
        }

        // ==================== الذكريات ====================
        function initMemories() {
            const timeline = document.getElementById('timeline');
            timeline.innerHTML = '';

            memories.forEach((memory, index) => {
                const item = document.createElement('div');
                item.className = 'timeline-item animate-slide-up';
                item.style.animationDelay = (index * 0.15) + 's';
                item.innerHTML = `
                    <div class="timeline-dot" style="background: linear-gradient(135deg, var(--soft-pink), var(--rose));">
                        <span style="font-size: 14px;">${memory.icon}</span>
                    </div>
                    <div class="timeline-card">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <span class="timeline-title">${memory.title}</span>
                            <span class="timeline-date">${memory.date}</span>
                        </div>
                        <p class="timeline-description">${memory.description}</p>
                        <div style="display: flex; gap: 4px; margin-top: 12px;">
                            <span style="color: var(--soft-pink); font-size: 12px;">💕</span>
                            <span style="color: var(--soft-pink); font-size: 12px;">💕</span>
                            <span style="color: var(--soft-pink); font-size: 12px;">💕</span>
                        </div>
                    </div>
                `;
                timeline.appendChild(item);
            });
        }

        // ==================== المناسبات ====================
        function initSpecialDates() {
            const list = document.getElementById('dates-list');
            list.innerHTML = '';

            const datesWithDays = specialDates.map(d => {
                const [month, day] = d.date.split('/').map(Number);
                const now = new Date();
                let target = new Date(now.getFullYear(), month - 1, day);
                if (target < now) target = new Date(now.getFullYear() + 1, month - 1, day);
                const daysLeft = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
                return { ...d, daysLeft };
            }).sort((a, b) => a.daysLeft - b.daysLeft);

            datesWithDays.forEach((date, index) => {
                const item = document.createElement('div');
                item.className = 'date-item animate-slide-up';
                item.style.animationDelay = (index * 0.1) + 's';
                item.innerHTML = `
                    <div class="date-icon">
                        <span style="font-size: 24px;">${date.icon}</span>
                    </div>
                    <div class="date-info">
                        <span class="date-title">${date.title}</span>
                        <span class="date-value">${date.date}</span>
                    </div>
                    <div class="days-left">
                        <span class="days-number">${date.daysLeft}</span>
                        <span class="days-label">يوم</span>
                    </div>
                `;
                list.appendChild(item);
            });
        }

        // ==================== الاقتباسات ====================
        function initQuotes() {
            updateQuote();
            createQuoteDots();
            setInterval(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                updateQuote();
                updateQuoteDots();
            }, 5000);
        }

        function updateQuote() {
            const text = document.getElementById('quote-text');
            text.textContent = '"' + quotes[currentQuote].text + '"';
            text.classList.remove('animate-fade-in');
            void text.offsetWidth;
            text.classList.add('animate-fade-in');

            document.getElementById('quote-author').innerHTML = `❤️ ~ ${quotes[currentQuote].author} ~ ❤️`;
        }

        function createQuoteDots() {
            const dotsContainer = document.getElementById('quote-dots');
            dotsContainer.innerHTML = '';
            quotes.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'quote-dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => {
                    currentQuote = index;
                    updateQuote();
                    updateQuoteDots();
                };
                dotsContainer.appendChild(dot);
            });
        }

        function updateQuoteDots() {
            const dots = document.querySelectorAll('.quote-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentQuote);
            });
        }

        // ==================== رسالة الحب ====================
        function sendLove() {
            const message = document.getElementById('custom-message').value;
            const btn = document.getElementById('send-btn-text');
            
            if (message.trim()) {
                btn.textContent = '❤️ تم إرسال الحب 💕';
                setTimeout(() => {
                    btn.textContent = '📤 أرسل الحب';
                    document.getElementById('custom-message').value = '';
                }, 3000);
            }
        }

        // ==================== تشغيل الصفحة ====================
        document.addEventListener('DOMContentLoaded', () => {
            createFloatingHearts('floating-hearts-letter');
        });

        // إغلاق Lightbox بالضغط على Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });