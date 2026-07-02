# 📝 Sticky Notes – Beautiful & Fast Notes Dashboard

A modern, responsive, and feature-rich Sticky Notes application built using **HTML**, **CSS**, and **JavaScript**, with **Supabase** providing authentication and cloud database storage.

Designed with a clean, minimal interface inspired by modern productivity apps, this project delivers a smooth user experience with beautiful animations, responsive layouts, light/dark themes, and real-time note management.

---

## ✨ Preview

> Add screenshots or GIFs here after uploading them to GitHub.

| Light Mode | Dark Mode |
|------------|-----------|
| Screenshot | Screenshot |

---

# 🚀 Features

## 📝 Notes Management

- ✨ Create new notes
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 🎨 Color-coded note cards
- 🕒 Automatic timestamps
- ⚡ Smooth hover animations
- 📱 Fully responsive grid layout

---

## 🎨 Beautiful UI

- Pixel-perfect modern interface
- Clean sidebar navigation
- Floating Action Button (FAB)
- Elegant modal animations
- Floating input labels
- Rounded corners
- Soft shadows
- Glassmorphism-inspired design
- Smooth page transitions

---

## 🌙 Light & Dark Theme

- One-click theme switching
- Beautiful dark mode
- Theme preference saved automatically
- Smooth color transitions

---

## 🔍 Smart Search

- Instant note searching
- Real-time filtering
- Keyboard shortcut:

```text
Ctrl + K
```

---

## 🔐 Authentication (Supabase)

- User Signup
- User Login
- Secure Logout
- Protected Dashboard
- User Email Display
- Avatar Initials

---

## 📁 Project Structure

```text
project/
│
├── index.html
│
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
│
├── auth/
│   ├── login.html
│   ├── signup.html
│   └── auth.css
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
│
└── README.md
```

---

# 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Supabase Authentication
- Supabase Database
- Poppins Font
- Responsive CSS Grid
- CSS Flexbox

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/MuhammadMuzammil-TheDeveloper/sticky-notes-supabase.git
```

## 2. Navigate to the project folder

```bash
cd sticky-notes-supabase
```

## 3. Configure Supabase

Create a Supabase project and replace the credentials inside your JavaScript file:

```javascript
const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);
```

---

## 4. Run the project

Simply open

```text
dashboard/dashboard.html
```

or use **Live Server** in VS Code for the best development experience.

---

# 🗄️ Database Schema

Create a table named:

```text
notes
```

Suggested columns:

| Column | Type |
|---------|------|
| id | uuid |
| user_id | uuid |
| title | text |
| content | text |
| color | text |
| created_at | timestamp |

Enable **Row Level Security (RLS)** and configure policies so users can only access their own notes.

---

# 📱 Responsive Design

The dashboard is optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📲 Tablet

---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl + K | Search Notes |
| Esc | Close Modal |

---

# 🚀 Future Improvements

- 📌 Pin Notes
- 🏷️ Categories & Tags
- 🎯 Drag & Drop Notes
- 📂 Archive Notes
- 🗑️ Trash Bin
- ⭐ Favorite Notes
- 📎 File Attachments
- 😊 Emoji Support
- 🔔 Reminder Notifications
- 🤝 Share Notes
- 🔄 Real-time Sync
- 📱 Progressive Web App (PWA)
- 🌍 Multi-language Support

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 🐞 Found a Bug?

If you discover any bugs or have feature suggestions, please open an issue on GitHub.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

It helps others discover the project and motivates future improvements.

---

# 👨‍💻 Author

**Muhammad Muzammil**

- 💼 Full Stack Developer
- 🌐 Passionate about modern UI/UX and web development

GitHub:

**https://github.com/MuhammadMuzammil-TheDeveloper**

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it for personal or commercial projects.

---

## ❤️ Built with passion using HTML, CSS, JavaScript, and Supabase.
