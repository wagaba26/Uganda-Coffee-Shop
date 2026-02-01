'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
    id: number;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        image: '/images/team/team-1.jpg',
    },
    {
        id: 2,
        image: '/images/team/team-2.jpg',
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className="rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden bg-transparent">
                                <Image
                                    src={member.image}
                                    alt="Team member"
                                    width={1200}
                                    height={1600}
                                    className="block w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Join Team CTA */}
                <div className="mt-16" />
            </div>
        </section>
    );
}
