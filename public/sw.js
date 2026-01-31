self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: '通知テスト', body: '成功しました！' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'https://via.placeholder.com/192'
    })
  );
});

// ローカルテスト用：メッセージを受け取って即座に通知を出す
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification('ローカル通知', {
      body: 'iPhone のホーム画面から通知が出ています！',
      icon: 'https://via.placeholder.com/192'
    });
  }
});

