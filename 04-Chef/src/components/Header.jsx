import icon from '../assets/chef-claude-icon.png'


export default function Header(){
    return(
        <header className='flex justify-center items-center gap-4 h-25 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10),_0px_1px_2px_0px_rgba(0,0,0,0.06)] bg-white'>
            <img
                className='w-14'
            src={icon} />
            <p className='text-4xl'>Chef Claude</p>

        </header>
    )
}