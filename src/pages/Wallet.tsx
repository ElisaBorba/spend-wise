import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import styles from './Wallet.module.css';

function Wallet() {
  return (
    <main>
      <Header />
      <div className={ styles.content }>
        <WalletForm />
        <Table />
      </div>
    </main>
  );
}

export default Wallet;
