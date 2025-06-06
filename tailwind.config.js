module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],  // 监视这些目录里的文件来tree-shaking无用样式
  theme: {
    extend: {
      colors: {
        primary: '#00ff9d',     // 霓虹绿
        secondary: '#bd93f9',   // 紫色
        background: '#282a36',  // 深灰蓝背景
        text: '#f8f8f2',        // 浅灰文字
        accent: '#ff79c6',      // 粉色强调
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'], // 代码等等使用的等宽字体
      },
      // 如果需要，你可以这里继续扩展，比如 spacing、borderRadius、boxShadow 等
    },
  },
  plugins: [
    // 这里可以添加官方或社区插件，比如：
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  darkMode: 'class', // 支持基于 class 的暗黑模式切换
};
