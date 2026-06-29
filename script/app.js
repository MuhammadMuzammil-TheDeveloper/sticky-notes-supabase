// MUHAMMAD_MUZAMMIL (tea)

// Muzammil@786

const supabaseUrl = "https://sqzvwtpnsmhetokppevz.supabase.co";
const supabaseKey = "sb_publishable_CU3WNUWB-GFRdOxTpnntPA_i7DOeN5t";

console.log(supabase);

const client = supabase.createClient(supabaseUrl, supabaseKey);

let signUp = document.getElementById("signUp");
let login = document.getElementById("login");


signUp.addEventListener("click", async () => {

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  });

  console.log("data", data);
  console.log("error", error);

});


login.addEventListener("click", async () => {
  console.log("workingg...");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log("data", data)
  console.log("error", error)
});
































// async function signup() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const { data, error } = await client.auth.signUp({
//     email,
//     password
//   });

//   if (error) {
//     alert(error.message);
//   } else {
//     alert("Signup successful! Now login.");
//   }
// }
// async function login() {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const { data, error } = await client.auth.signInWithPassword({
//     email,
//     password
//   });

//   if (error) {
//     alert(error.message);
//   } else {
//     document.getElementById("auth-section").classList.add("hidden");
//     document.getElementById("app-section").classList.remove("hidden");
//     loadNotes();
//   }
// }
