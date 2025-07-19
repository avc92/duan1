import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
interface Transaction {
  id: number;
  type: 'received' | 'sent';
  from?: string;
  to?: string;
  amount: number;
  date: string;
}

// --- Dữ liệu mô phỏng ---
// Trong một ứng dụng thực tế, dữ liệu này sẽ được lấy từ Pi SDK.
const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'received',
    from: 'GC5R...2Z3D',
    amount: 10.5,
    date: '2024-07-28',
  },
  {
    id: 2,
    type: 'sent',
    to: 'GAI3...Y7QW',
    amount: 2.15,
    date: '2024-07-27',
  },
  {
    id: 3,
    type: 'received',
    from: 'GDRP...5T6K',
    amount: 100.0,
    date: '2024-07-26',
  },
  {
    id: 4,
    type: 'sent',
    to: 'GBH2...L4V7',
    amount: 50.75,
    date: '2024-07-25',
  },
   {
    id: 5,
    type: 'received',
    from: 'GCFA...9A8B',
    amount: 1.234,
    date: '2024-07-24',
  },
];

const truncateAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isSent = transaction.type === 'sent';
  const amountPrefix = isSent ? '-' : '+';
  const amountClass = isSent ? 'sent' : 'received';
  const iconSymbol = isSent ? '↑' : '↓';
  const address = isSent ? `To: ${truncateAddress(transaction.to!)}` : `From: ${truncateAddress(transaction.from!)}`;
  const typeText = isSent ? 'Đã gửi Pi' : 'Đã nhận Pi';

  return (
    <li className="transaction-item" role="listitem">
      <div className="transaction-details">
        <div className={`transaction-icon ${amountClass}`} aria-hidden="true">
          {iconSymbol}
        </div>
        <div className="transaction-info">
          <span className="type">{typeText}</span>
          <span className="address">{address}</span>
        </div>
      </div>
      <div className={`transaction-amount ${amountClass}`}>
        {amountPrefix}{transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} π
      </div>
    </li>
  );
};

const PiWalletApp = () => {
  // Giả sử số dư và giá ban đầu. Sẽ được lấy từ SDK và API trong ứng dụng thực.
  const [balance] = useState(1234.5678);
  const [transactions] = useState(mockTransactions);
  const [piPrice] = useState(40.12); // Giá Pi mô phỏng bằng USD

  const usdValue = balance * piPrice;

  return (
    <div className="wallet-container" role="main" aria-labelledby="wallet-heading">
      <header className="wallet-header">
        <h1 id="wallet-heading">
            <span className="pi-logo" aria-hidden="true">π</span>
            Pi Wallet
        </h1>
        {/* Có thể thêm biểu tượng cài đặt ở đây */}
      </header>

      <section className="balance-section" aria-label="Current Balance">
        <div className="balance-label">Số dư của bạn</div>
        <div className="balance-amount">
          {balance.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} <span>π</span>
        </div>
        <div className="balance-usd" aria-label="Giá trị tương đương bằng USD">
          ≈ ${usdValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </div>
      </section>

      <section className="actions" aria-label="Wallet Actions">
        <button className="action-button send" type="button" aria-label="Send Pi">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          Gửi
        </button>
        <button className="action-button receive" type="button" aria-label="Receive Pi">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          Nhận
        </button>
      </section>

      <section className="transactions-section" aria-labelledby="transactions-heading">
        <h2 id="transactions-heading" className="transactions-header">Lịch sử giao dịch</h2>
        {transactions.length > 0 ? (
          <ul className="transaction-list" role="list">
            {transactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </ul>
        ) : (
          <p>Chưa có giao dịch nào.</p>
        )}
      </section>
      
      <footer className="footer">
        Bảo mật bởi Pi Core Team
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<PiWalletApp />);