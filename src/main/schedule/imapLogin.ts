const Imap = require('imap');

// Gmail IMAP 服务器地址和端口号
const imapConfig = {
  user: 'stevenbreak_@hotmail.com', // Gmail 邮箱地址
  password: 'Gzcrew1991@', // Gmail 密码或应用程序专用密码
  host: 'imap-mail.outlook.com',
  port: 993,
  tls: true, // 使用 TLS 连接
  tlsOptions: {
    rejectUnauthorized: false,
  },
  connTimeout: 200000,
  authTimeout: 200000,
};

// 创建 IMAP 客户端
const imap = new Imap(imapConfig);

// 连接到 IMAP 服务器
console.log('start connect');
imap.connect();

// 处理连接成功事件
imap.once('ready', () => {
  console.log('Connected to Gmail IMAP server');
  // 成功了
  console.log('start openbox');

  imap.openBox('INBOX', false, (err, mailbox) => {
    if (err) {
      console.error('Failed to open INBOX:', err);
      return;
    }
    // 打开了收件箱
    console.log('openbox success', mailbox);

    console.log('start search all');
    // 获取所有邮件的摘要信息
    imap.search(['ALL'], (err, results) => {
      if (err) {
        console.error('Failed to search for emails:', err);
        return;
      }

      // 打印所有邮件的标题
      results.forEach((uid) => {
        const fetch = imap.fetch(uid, { bodies: 'HEADER.FIELDS (SUBJECT)' });
        fetch.on('message', (msg) => {
          msg.on('body', (stream) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', () => {
              // 提取邮件标题并打印
              const matches = buffer.match(/Subject: (.+)/);
              const title = matches ? matches[1] : 'No title';
              console.log('Email title:', title);
            });
          });
        });
      });

      // 关闭连接
      imap.end();
    });
  });
});

// 处理连接错误事件
imap.once('error', (err) => {
  console.error('IMAP connection error:', err);
});

// 处理连接关闭事件
imap.once('end', () => {
  console.log('IMAP connection closed');
});
