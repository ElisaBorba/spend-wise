import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const data = useSelector((globalState: GlobalState) => globalState.user);

  return (
    <div>
      <h1 data-testid="email-field">{`Email: ${data.email}`}</h1>
      <h2 data-testid="total-field">0</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </div>
  );
}

export default Header;
