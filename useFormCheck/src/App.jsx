import { useState } from 'react';
import logo from './assets/gdg khu.png';
import './App.css';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({}); // 에러 메시지를 저장할 상태 추가
  const [successMessages, setSuccessMessages] = useState({}); // 성공 메시지를 저장할 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validateField(name, value); // 필드 유효성 검사
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({}); // 폼 리셋 시 에러 메시지 초기화
    setSuccessMessages({}); // 폼 리셋 시 성공 메시지 초기화
  };

  // 유효성 검사 함수
  const validateField = (name, value) => {
    let errorMsg = '';
    let successMsg = '';
    switch (name) {
      case 'username':
        if (value.trim() === '') {
          errorMsg = '';
          successMsg = '';
        } else if (value.length < 2 || value.length > 20) {
          errorMsg = '이름은 2자 이상 20자 이하로 입력해야 합니다.';
          successMsg = '';
        } else {
          successMsg = '이름이 유효합니다.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') {
          errorMsg = '';
          successMsg = '';
        } else if (!emailRegex.test(value)) {
          errorMsg = '유효한 이메일 주소를 입력하세요.';
          successMsg = '';
        } else {
          successMsg = '이메일이 유효합니다.';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (value.trim() === '') {
          errorMsg = '';
          successMsg = '';
        } else if (!passwordRegex.test(value)) {
          errorMsg = '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.';
          successMsg = '';
        } else {
          successMsg = '비밀번호가 유효합니다.';
        }
        break;
      case 'date':
        if (value.trim() === '') {
          errorMsg = '';
          successMsg = '';
        } else if (isNaN(new Date(value))) {
          errorMsg = '유효한 날짜를 입력하세요.';
          successMsg = '';
        } else {
          successMsg = '날짜가 유효합니다.';
        }
        break;
      case 'number':
        if (value.trim() === '') {
          errorMsg = '';
          successMsg = '';
        } else if (isNaN(value) || value < 1 || value > 100) { // 예시: 1부터 100 사이의 숫자
          errorMsg = '숫자는 1과 100 사이여야 합니다.';
          successMsg = '';
        } else {
          successMsg = '숫자가 유효합니다.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    setSuccessMessages((prevSuccess) => ({ ...prevSuccess, [name]: successMsg }));
  };

  return { values, handleChange, resetForm, errors, successMessages };
}

function App() {
  const { values, handleChange, errors, successMessages } = useForm({ username: '', email: '', password: '', date: '', number: '' });

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    // 모든 필드에 대해 유효성 검사 실행
    validateForm();

    // 에러가 없을 경우 제출 처리
    if (Object.values(errors).every((err) => err === '')) {
      console.log('Submitted values:', values);
      // 여기서 실제 회원가입 처리 로직 구현 가능
    }
  };

  // 전체 폼 유효성 검사
  const validateForm = () => {
    for (const field in values) {
      validateField(field, values[field]);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="홈페이지 로고" className="logo" />
      <h2>회원가입</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">이름 </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={values.username} 
              onChange={handleChange} 
            />
            {errors.username && <p className="error">{errors.username}</p>} {/* 에러 메시지 출력 */}
            {successMessages.username && <p className="success">{successMessages.username}</p>} {/* 성공 메시지 출력 */}
          </div>

          <div>
            <label htmlFor="email">이메일 </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={values.email} 
              onChange={handleChange} 
            />
            {errors.email && <p className="error">{errors.email}</p>} {/* 에러 메시지 출력 */}
            {successMessages.email && <p className="success">{successMessages.email}</p>} {/* 성공 메시지 출력 */}
          </div>

          <div>
            <label htmlFor="password">비밀번호 </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={values.password} 
              onChange={handleChange} 
            />
            {errors.password && <p className="error">{errors.password}</p>} {/* 에러 메시지 출력 */}
            {successMessages.password && <p className="success">{successMessages.password}</p>} {/* 성공 메시지 출력 */}
          </div>

          <div>
            <label htmlFor="date">생년월일 </label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={values.date} 
              onChange={handleChange} 
            />
            {errors.date && <p className="error">{errors.date}</p>} {/* 에러 메시지 출력 */}
            {successMessages.date && <p className="success">{successMessages.date}</p>} {/* 성공 메시지 출력 */}
          </div>

          <div>
            <label htmlFor="number">숫자 (1-100) </label>
            <input 
              type="number" 
              id="number" 
              name="number" 
              value={values.number} 
              onChange={handleChange} 
            />
            {errors.number && <p className="error">{errors.number}</p>} {/* 에러 메시지 출력 */}
            {successMessages.number && <p className="success">{successMessages.number}</p>} {/* 성공 메시지 출력 */}
          </div>

          <button type="submit">회원가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default App;
