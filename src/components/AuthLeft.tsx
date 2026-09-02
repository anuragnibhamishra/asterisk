import loginBackground from '@/assets/loginBackground.jpg';
import logoNoBG from '@/assets/logoNoBG.svg';
export function AuthLeft() {
    return (
        <div className='hidden lg:flex w-1/2 relative border-r-2 border-surface-border/60 h-screen'>
        <img src={loginBackground} alt="Login background" className='w-full h-full opacity-20 object-cover' />
        <div className='w-full h-full absolute flex flex-col items-center justify-center gap-4'>
          <img src={logoNoBG} alt="logo" />
          <span className='font-semibold text-4xl text-center '>Asterisk</span>
          <p className='text-text-muted font-math max-w-lg text-center'>
            Master permutations, combinations, and probability with step-by-step solutions.
          </p>
          
        </div>
      </div>
    )
}