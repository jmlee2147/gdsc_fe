import { useState } from 'react';
import logo from './assets/gdg khu.png';
import './App.css';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

function App() {
  return (
    <div className="container">
      <img src={logo} alt="홈페이지 로고" className="logo" />
      <h2>회원가입</h2>
      
      <div className="form-container">
        <form>
          <div>
            <label htmlFor="username">이름 </label>
            <input type="text" id="username" name="username" />
          </div>

          <div>
            <label htmlFor="email">이메일 </label>
            <input type="email" id="email" name="email" />
          </div>

          <div>
            <label htmlFor="password">비밀번호 </label>
            <input type="password" id="password" name="password" />
          </div>

          <button type="submit">회원가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default App;
