import React from 'react';

const SocialLinks = () => {
  const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/24c2501c037744564913b3a95b22bfccce80b8d981f3f5a90309efd70d355ff8?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b", alt: "Facebook" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/449b41eb3abdc3ecb6131edc805bd0c30e34f325bd6f347ee03bd5af4d6e2051?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b", alt: "Twitter" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60afb19ef4cf6d4636c7b618b9934f352d28ee47ff5bd453edc3729151cd21d6?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b", alt: "Instagram" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae492a4f087524ef43d8a9227c21edb43e352e7120c306be47642f020dfd752e?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b", alt: "LinkedIn" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c6c779f7743636159b4085a5a77db9c13b0cd22259f2dbb2953b98c9877129d?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b", alt: "YouTube" }
  ];

  return (
    <div className="social-links">
      <h3 className="social-heading">Official Facebook Pages:</h3>
      <div className="social-icons">
        {socialIcons.map((icon, index) => (
          <a href="#" key={index} className="social-icon-link">
            <img src={icon.src} alt={icon.alt} className="social-icon" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;