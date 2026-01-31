'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'James Mukasa',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
        bio: 'Passionate about bringing Ugandan coffee to the world.'
    },
    {
        id: 2,
        name: 'Sarah Nakato',
        role: 'Head of Operations',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
        bio: 'Ensuring excellence in every cup we serve.'
    },
    {
        id: 3,
        name: 'David Ochieng',
        role: 'Master Roaster',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
        bio: 'Crafting the perfect roast for over 15 years.'
    },
    {
        id: 4,
        name: 'Grace Auma',
        role: 'Customer Experience',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
        bio: 'Creating memorable experiences for every customer.'
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function TeamSection() {
    const t = useTranslations('Team');

    return (
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="block text-brand-red text-sm font-bold tracking-widest uppercase mb-4"
                    >
                        {t('label')}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 leading-tight"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 font-sans leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Team Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Bio on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-white text-sm font-sans leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5 text-center">
                                    <h3 className="text-lg font-serif font-bold text-charcoal mb-1 group-hover:text-brand-red transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Join Team CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-600 font-sans mb-4">{t('join_text')}</p>
                    <button className="text-charcoal border-b border-charcoal pb-1 hover:text-brand-red hover:border-brand-red transition-colors font-medium tracking-wide uppercase text-sm">
                        {t('join_cta')}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
