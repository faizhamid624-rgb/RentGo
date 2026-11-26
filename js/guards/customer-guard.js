const { getSession } = window.RentGoStore;

const session = getSession();
if (!session || session.role !== "customer") {
    sessionStorage.setItem("rentgo_return_to", window.location.href);
    window.location.replace("../login.html");
}
