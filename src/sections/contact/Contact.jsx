import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "../../components/ui";
import { Particles } from "../../components/animations";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [lastSubmission, setLastSubmission] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const MAX_SUBMISSIONS_PER_HOUR = 3;
  const COOLDOWN_TIME = 60 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setSubmissionCount(0);
    }, COOLDOWN_TIME);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isRateLimited = () => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;

    if (timeSinceLastSubmission < 30000) {
      return true;
    }

    if (submissionCount >= MAX_SUBMISSIONS_PER_HOUR) {
      return true;
    }

    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateEmail(formData.email)) {
        setIsLoading(false);
        showAlertMessage("danger", "Please enter a valid email address.");
        return;
      }

      if (formData.message.length < 10) {
        setIsLoading(false);
        showAlertMessage(
          "danger",
          "Message must be at least 10 characters long."
        );
        return;
      }

      if (formData.name.length < 2) {
        setIsLoading(false);
        showAlertMessage("danger", "Name must be at least 2 characters long.");
        return;
      }

      if (isRateLimited()) {
        setIsLoading(false);
        const remainingTime = Math.ceil(
          (30000 - (Date.now() - lastSubmission)) / 1000
        );
        if (submissionCount >= MAX_SUBMISSIONS_PER_HOUR) {
          showAlertMessage(
            "danger",
            "Too many submissions. Please try again in an hour."
          );
        } else {
          showAlertMessage(
            "danger",
            `Please wait ${remainingTime} seconds before sending another message.`
          );
        }
        return;
      }

      await emailjs.send(
        "service_7ipjy6a",
        "template_ibq6dus",
        {
          from_name: formData.name,
          to_name: "Lucas",
          from_email: formData.email,
          to_email: "lukashellanio@gmail.com",
          message: formData.message,
        },
        "4L9uNDjVKPFOktBku"
      );

      setLastSubmission(Date.now());
      setSubmissionCount((prev) => prev + 1);

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent successfully!");
    } catch (error) {
      setIsLoading(false);

      let errorMessage = "Something went wrong!";

      if (error.status === 404) {
        errorMessage = "Email service not found. Please check configuration.";
      } else if (error.status === 400) {
        errorMessage = "Invalid request. Please check your email address.";
      } else if (error.status === 401) {
        errorMessage = "Unauthorized. Please check API key.";
      } else if (error.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      showAlertMessage("danger", errorMessage);
    }
  };
  return (
    <section
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're loking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
