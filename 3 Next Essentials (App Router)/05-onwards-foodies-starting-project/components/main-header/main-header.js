import classes from './main-header.module.css';

import logoImg from '@/assets/logo.png';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';
import Link from 'next/link';

export default function MainHeader() {
   return (
      <>
         <MainHeaderBackground />

         <header className={classes.header}>
            <Link className={classes.logo} href="/">
               <Image src={logoImg} alt="Logo img" priority />
               NextLevel Food
            </Link>

            <nav className={classes.nav}>
               <ul>
                  <li>
                     <NavLink href="/meals">Browse Meals</NavLink>
                  </li>
                  <li>
                     <NavLink href="/community">Foodies Community</NavLink>
                  </li>
               </ul>
            </nav>
         </header>
      </>
   );
}
