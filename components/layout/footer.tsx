function Footer() {
    return (
        <footer className="sticky top-[100vh] text-center w-full p-[12px] border-t-[1px] border-[var(--main-color)] mt-[12px]">
            <div className="max-w-5xl mx-auto bg-[#ffffff]">
                &copy; {new Date().getFullYear()} Coinova. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer;