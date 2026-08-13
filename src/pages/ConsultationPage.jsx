import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowUpRight, Phone, MessageCircle, CheckCircle } from 'lucide-react'

const goals = [
  'Fat Loss', 'Muscle Building', 'Body Transformation', 'Rehabilitation',
  "Women's Fitness", 'Senior Fitness', 'Home Personal Training', 'Yoga',
  'Zumba', 'Mobility & Flexibility', 'Nutrition Guidance', 'Other',
]

const timeSlots = [
  'Early Morning (6:00 – 8:00 AM)',
  'Morning (8:00 – 10:00 AM)',
  'Late Morning (10:00 AM – 12:00 PM)',
  'Afternoon (12:00 – 3:00 PM)',
  'Evening (4:00 – 6:00 PM)',
  'Late Evening (6:00 – 9:00 PM)',
]

const conditions = [
  'None', 'Diabetes', 'Hypertension', 'Back Pain', 'Knee Pain', 'Post Surgery', 'PCOS',
  'Osteoporosis', 'Heart Condition', 'Thyroid Disorder', 'Sports Injury', 'Other',
]

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedGoals, setSelectedGoals] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm()

  const toggleGoal = (goal) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const onSubmit = (data) => {
    console.log({ ...data, goals: selectedGoals })
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-10 bg-[#231F20]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-label text-[#E8B884] block mb-4">
              Free Consultation
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9 }}
              className="font-serif text-headline text-white mb-6"
            >
              Your journey begins
              <br />
              <em className="text-[#E8B884]">with a conversation.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-base text-white/55 leading-relaxed mb-8">
              Book your free consultation with our team. No pressure, no commitment — just an honest conversation about your health goals and how we can help.
            </motion.p>
            {/* Contact options */}
            <div className="space-y-3">
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 text-white/70 hover:text-[#E8B884] transition-colors text-sm">
                <Phone size={14} className="text-[#E8B884]" />
                <span>+91 XXX XXX XXXX (Call directly)</span>
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#E8B884] transition-colors text-sm">
                <MessageCircle size={14} className="text-[#25D366]" />
                <span>WhatsApp us anytime</span>
              </a>
            </div>
          </div>
          <div className="glass-dark p-8 rounded-xl">
            {[
              { label: '100% Free', desc: 'No hidden charges for the consultation' },
              { label: 'No Commitment', desc: 'Zero obligation to join any program' },
              { label: 'Expert Advice', desc: 'Speak directly with a certified trainer' },
              { label: 'Same-Day Callback', desc: 'We respond within a few hours' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-b-0">
                <CheckCircle size={16} className="text-green-brand flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-[#F8F6F4]">
        <div className="container-custom max-w-3xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <CheckCircle size={64} className="text-[#2B6F6F] mx-auto mb-6" />
              <h2 className="font-serif text-3xl lg:text-4xl text-[#231F20] mb-4 font-bold">
                Thank you! We'll be in touch <em className="text-[#E8B884]">shortly.</em>
              </h2>
              <p className="text-sm text-[#231F20]/55 max-w-md mx-auto">
                Our team typically responds within a few hours. We look forward to speaking with you and beginning your transformation journey.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-12">
                <span className="text-label text-[#2B6F6F] block mb-3">Booking Form</span>
                <h2 className="font-serif text-headline text-[#231F20] font-bold">
                  Tell us about <em className="text-[#E8B884]">yourself</em>
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Info */}
                <div className="bg-white border border-[#EDE9E4] p-8">
                  <h3 className="text-label text-[#2B6F6F] mb-6 font-bold">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input {...register('name', { required: 'Name is required' })} placeholder="Your full name" className="form-input" />
                      {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
                    </div>
                    <div>
                      <label className="form-label">Phone Number *</label>
                      <input {...register('phone', { required: 'Phone is required' })} placeholder="+91 XXXXX XXXXX" className="form-input" />
                      {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Age</label>
                      <input {...register('age')} type="number" placeholder="Your age" className="form-input" />
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white border border-[#EDE9E4] p-8">
                  <h3 className="text-label text-[#2B6F6F] mb-2 font-bold">Your Goals</h3>
                  <p className="text-xs text-[#231F20]/40 mb-6">Select all that apply</p>
                  <div className="flex flex-wrap gap-3">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                          selectedGoals.includes(goal)
                            ? 'bg-[#231F20] text-[#E8B884] border-[#231F20]'
                            : 'border-[#EDE9E4] text-[#231F20]/50 hover:border-[#E8B884] hover:text-[#231F20]'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Time */}
                <div className="bg-white border border-[#EDE9E4] p-8">
                  <h3 className="text-label text-[#2B6F6F] mb-6 font-bold">Preferred Training Time</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <label key={slot} className="flex items-center gap-3 cursor-pointer group">
                        <input {...register('timeSlot')} type="radio" value={slot} className="accent-[#2B6F6F]" />
                        <span className="text-sm text-[#231F20]/60 group-hover:text-[#231F20] transition-colors">{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Health Conditions */}
                <div className="bg-white border border-[#EDE9E4] p-8">
                  <h3 className="text-label text-[#2B6F6F] mb-2 font-bold">Any Existing Health Conditions?</h3>
                  <p className="text-xs text-[#231F20]/40 mb-6">This helps us design a safe, appropriate program for you.</p>
                  <select {...register('condition')} className="form-input">
                    <option value="">Select a condition (if any)</option>
                    {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="bg-white border border-[#EDE9E4] p-8">
                  <h3 className="text-label text-[#2B6F6F] mb-6 font-bold">Anything Else We Should Know?</h3>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your current fitness level, past injuries, or any other information that would help us prepare for your consultation..."
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center group text-sm"
                >
                  <span>Book My Free Consultation</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-[#231F20]/30">
                  By submitting, you agree that we may contact you regarding your consultation. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  )
}
