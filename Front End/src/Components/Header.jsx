import logo from '../assets/react.svg'

function Header({isLoggedIn}){
    return (
        <header>
			<section>
				<a href='#'><img src={logo} alt='' /></a>
				<p>Project System <span>KSR</span></p>
			</section>
			<nav>
				<ul>
					<li><a href='/'>Home</a></li>
					<li><a href='#'>Projects</a></li>
					<li><a href='#'>Institutional Login</a></li>
					{(isLoggedIn)?
					<li><a href='/profile'>Profile</a></li>:
					<li><a href='/login'>Login</a></li>}
                </ul>
			</nav>
		</header>
    );
}

export default Header;