'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Service Worker の登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.error('SW error', err));
    }
  }, []);

  const handleTestNotification = async () => {
    // 1. 通知の許可をもらう
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const reg = await navigator.serviceWorker.ready;
      // 2. Service Worker へ通知を出すよう命令を送る
      reg.active?.postMessage({ type: 'SHOW_NOTIFICATION' });
    } else {
      alert('通知を許可してください。設定 > Safari > 通知 または アプリの設定から変更できます。');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">iPhone 通知プロトタイプ</h1>
      
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner mb-6">
        <p className="text-sm text-gray-600 mb-4">
          【重要】iPhone の場合は以下の手順を踏んでください：<br/>
          1. Safari の共有ボタンをタップ<br/>
          2. 「ホーム画面に追加」をタップ<br/>
          3. ホーム画面にできたアイコンから開き直す
        </p>
        
        <button
          onClick={handleTestNotification}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold active:scale-95 transition-transform"
        >
          通知テストを実行
        </button>
      </div>
    </main>
  );
}
