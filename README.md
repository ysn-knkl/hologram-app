# hologram-app
assignment app

-proje de yarn package yönetici kullanıldı.

-charts ve card sayfalarındaki veriler için "mockapi.io" ile servis oluşturulup çekildi

-state yönetimi için redux/toolkit paketi ve React Context kullanıldı.

-UI Library olarak UI Kitten kullanıldı. "dark" ve "light" theme özelliği ve komponentleri kullanıldı.

-api call için axios kütüphanesi kullanıldı.

-barcode scanner için "react-native-camera-kit" kütüphanesi tercih edildi.( iki defa aynı barcode eklenmemesi için notification eklendi, tabloda ikon ile eklenen barcode verisi silinebilmektedir.)

-tüm iconlar için "react-native-vector-icons" kullanıldı


     ---- İlave özellikler ----

-Login ve SignUp işlemleri için Firebase Auth kullanılmıştır.(Login ve SignUp esnasında gerçek mail ile kullanıcı girişi sağlanmakta, kendi mailinizle register olup login olabilirsiniz. Bu süreçlerde hata durumları için notification göstermektedir.
Sign Up olmadan login olmak için aşağıdaki bilgileri kullanabilirsiniz.

email:  yas@yas.com
pasword: 123123
)

-chart ekranında 500ms lik gecikme eklenerek loading spinner animasyonu eklendi

-Temanın son durumu local storage a kaydedilip app yeniden başladığında localden son hali çekilip context'e set ediliyor

-uyarılar için "react-native-alert-notification" paketi kullanıldı








NOT: uygulamada Barcode scanner ios için test edilemedi.
