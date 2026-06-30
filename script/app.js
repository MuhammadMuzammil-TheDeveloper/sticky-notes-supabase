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

  if (error) {
    console.log("error", error);
  } else {
    console.log("data", data);
    alert("Successfully Register");
  }
});

login.addEventListener("click", async () => {
  console.log("workingg...");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if(error){
    console.log("error", error);
  }
  else{
    console.log("data", data);
    window.location.href = './pages/dashboard.html'
  }
});
