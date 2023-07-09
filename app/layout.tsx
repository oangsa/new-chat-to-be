"use client"
import './globals.css'
import { Kanit } from 'next/font/google'
import React from 'react'
import { NextUIProvider} from '@nextui-org/react';
import {Layout} from "@/components/layout/layout"

const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

export const metadata = {
  title: 'To Be Number One',
  description: 'To Be Number One Web Application Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={kanit.className}>
          <NextUIProvider>
            <Layout>
              {children}
            </Layout>
          </NextUIProvider>
        </body>
      </html>
    
  )
}