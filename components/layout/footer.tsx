function Footer() {
    return (
        <footer className="sticky top-[100vh] text-center w-full p-[12px] border-t-[1px] border-[var(--main-color)]">
            <div className="footer-inner-wrapper max-w-5xl mx-auto bg-[#ffffff]">
                <div>
                    &copy; {new Date().getFullYear()} Coinova. All Rights Reserved.
                </div>

                <div className="source-code-link">
                    The source code is available on
                    <a
                        className="ml-2px"
                        href={'https://github.com/shubhamtak007/coinova'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>.
                </div>
            </div>
        </footer>
    )
}

export default Footer;