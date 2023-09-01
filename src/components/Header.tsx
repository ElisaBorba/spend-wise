import { useSelector } from 'react-redux';
import { LoginData } from '../types';

function Header() {
  const data = useSelector((globalState: LoginData) => globalState.userData);

  return (
    <div>
      <h1 data-testid="email-field">{`Email: ${data.email}`}</h1>
      <h2 data-testid="total-field">0</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </div>
  );
}

export default Header;
