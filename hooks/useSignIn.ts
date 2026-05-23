import AuthenticationService from "@/services/authentication.service";

function useSignIn() {
    async function signUpUser() {
        try {
            const response = await AuthenticationService.signUp({ name: 'working', email: 'working', password: 'working' })
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    return {
        signUpUser
    }
}

export default useSignIn;