import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-accent/15 px-4 py-1 text-sm font-semibold text-accent">
            Contact StoryVerse
          </span>

          <h1 className="mt-5 text-4xl font-bold text-primary md:text-5xl">
           {" We'd Love to Hear From You"}
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted">
            Whether you have questions about an order, need book
            recommendations, or simply want to say hello, our team is always
            happy to help.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-2xl font-bold text-primary">
              Get In Touch
            </h2>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-accent/15 p-3 text-accent">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-text">
                    Email
                  </h3>

                  <p className="text-muted">
                    support@storyverse.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-accent/15 p-3 text-accent">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-text">
                    Phone
                  </h3>

                  <p className="text-muted">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-accent/15 p-3 text-accent">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-text">
                    Address
                  </h3>

                  <p className="text-muted">
                    Kozhikode, Kerala, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-accent/15 p-3 text-accent">
                  <Clock size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-text">
                    Working Hours
                  </h3>

                  <p className="text-muted">
                    Monday – Saturday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-2xl font-bold text-primary">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-accent"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-accent"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-accent"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-accent"
              />

              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}