import Todo from './component/Todo';
import './App.css';
import SingIn from './component/SignIn';
import SignUp from "./component/SignUp"

function App() {


  const SignOut = ( ) => {
    return localStorage.clear();
  }

  return (
    <div className="App">
      {/* <SignUp /><br/> */}
      <SingIn />
      <Todo />
    </div>
  );
}

export default App;
