import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  imports: [
    TranslateModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css',
  animations: [
  trigger('accordionAnimation', [
    transition(':enter', [
      style({ height: 0, opacity: 0 }),
      animate('300ms ease', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease', style({ height: 0, opacity: 0 }))
    ])
  ]),

  trigger('listStagger', [
    transition(':enter', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ],
        { optional: true }
      )
    ])
  ])
]

})
export class TermsConditionsComponent {
   supportEmail = 'Evenza.support@gmail.com'

   openItem: number | null = null;
   toggleItem(index: number) {
    this.openItem = this.openItem === index ? null : index;
  }

  termsData = [
  {
    title: "Account Registration",
    content: `<p>By registering for an Evenza account, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts with inaccurate information.</p>`
  },
  {
    title: "Event Creation & Listing",
    content: `<p>When creating events on our platform:</p>
              <ul>
                <li>You must hold all necessary rights and licenses for the events you list</li>
                <li>All event descriptions must be accurate and not misleading</li>
                <li>Pricing and availability information must be current</li>
                <li>Prohibited content includes illegal activities, hate speech, explicit material, or fraudulent events</li>
              </ul>
              <p>We reserve the right to remove any event that violates these terms.</p>`
  },
  {
    title: "Payments & Fees",
    content: `<p>By using our payment services:</p>
              <ul>
                <li>You agree to pay all fees associated with transactions</li>
                <li>Evenza charges a platform fee of 2.5% + $0.30 per ticket sold</li>
                <li>Payment processing fees are separate and determined by our payment processors</li>
                <li>All fees are non-refundable unless otherwise stated in our refund policy</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>
              <p>Full details of our pricing structure can be found on our <a href="/pricing">Pricing Page</a>.</p>`
  },
  {
    title: "Refunds & Cancellations",
    content: `<p>Our refund and cancellation policies:</p>
              <ul>
                <li>Event organizers may set their own refund policies</li>
                <li>Evenza's platform fees are non-refundable</li>
                <li>If an event is cancelled by the organizer, attendees are entitled to a refund</li>
                <li>Disputes must be filed within 30 days of the event date</li>
                <li>We reserve the right to issue refunds at our discretion in exceptional circumstances</li>
              </ul>
              <p>For more detailed information, please see our <a href="/refund">Refund Policy</a>.</p>`
  },
  {
    title: "Intellectual Property Rights",
    content: `<p>Regarding intellectual property on our platform:</p>
              <ul>
                <li>All Evenza branding, logos, and platform design are our exclusive property</li>
                <li>You retain rights to your content but grant us a non-exclusive license to use it</li>
                <li>You must not use copyrighted material without permission</li>
                <li>We respect DMCA takedown requests for infringing content</li>
                <li>Event materials must not infringe on others' intellectual property</li>
              </ul>
              <p>To report copyright infringement, please contact <a href="mailto:copyright@evenza.com">copyright@evenza.com</a>.</p>`
  },
  {
    title: "User Conduct & Community Guidelines",
    content: `<p>As an Evenza user, you agree to:</p>
              <ul>
                <li>Interact with others respectfully</li>
                <li>Not engage in harassment, hate speech, or threatening behavior</li>
                <li>Not attempt to hack, disrupt, or damage our platform</li>
                <li>Not use our services for spam, scams, or illegal activities</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
              <p>Violations may result in account suspension or termination.</p>`
  },
  {
    title: "Privacy & Data Usage",
    content: `<p>Regarding your data:</p>
              <ul>
                <li>We collect personal information as described in our Privacy Policy</li>
                <li>We use cookies and similar technologies to enhance your experience</li>
                <li>Your data may be processed in countries outside your own</li>
                <li>We implement security measures but cannot guarantee absolute security</li>
                <li>You can request access to, correction of, or deletion of your data</li>
              </ul>
              <p>For complete details, please review our <a href="/privacy">Privacy Policy</a>.</p>`
  },
  {
    title: "Liability Limitations",
    content: `<p>Important limitations on our liability:</p>
              <ul>
                <li>Our platform is provided "as is" without warranties</li>
                <li>We are not responsible for user-generated content</li>
                <li>We are not liable for issues beyond our reasonable control</li>
                <li>Our liability is limited to the fees paid to us</li>
                <li>We do not guarantee uninterrupted service</li>
              </ul>
              <p>These limitations are to the maximum extent permitted by law.</p>`
  },
  {
    title: "Dispute Resolution",
    content: `<p>In case of disputes:</p>
              <ul>
                <li>We encourage resolution through our customer support team first</li>
                <li>Disputes will be resolved through binding arbitration</li>
                <li>You waive right to class actions</li>
                <li>Arbitration will occur in New York, NY</li>
                <li>The arbitration will be conducted in English</li>
              </ul>
              <p>Small claims court cases are exempt from mandatory arbitration.</p>`
  },
  {
    title: "Platform Modifications",
    content: `<p>Regarding changes to our platform:</p>
              <ul>
                <li>We reserve the right to modify, suspend, or discontinue any part of our services</li>
                <li>Features may be added or removed</li>
                <li>We may introduce new fees or change existing ones with notice</li>
                <li>We will attempt to notify users of significant changes</li>
                <li>Continued use after changes constitutes acceptance</li>
              </ul>
              <p>We encourage checking our Terms regularly for updates.</p>`
  },
  {
    title: "Term & Termination",
    content: `<p>Regarding the duration of our agreement:</p>
              <ul>
                <li>These terms remain in effect while you use our platform</li>
                <li>You may terminate by closing your account</li>
                <li>We may terminate or suspend your account for violations</li>
                <li>Some provisions survive termination (intellectual property, liability limitations)</li>
                <li>Upon termination, you lose access to our services</li>
              </ul>
              <p>We reserve the right to refuse service to anyone at our discretion.</p>`
  },
  {
    title: "Communications & Notifications",
    content: `<p>Regarding how we communicate:</p>
              <ul>
                <li>We may send electronic notifications about your account</li>
                <li>Service announcements will be posted on our website or sent via email</li>
                <li>You may opt-out of promotional communications</li>
                <li>Some administrative communications cannot be opted out of</li>
                <li>All notices to us should be sent to support@evenza.com</li>
              </ul>
              <p>Please keep your contact information current to receive important updates.</p>`
  },
  {
    title: "International Usage",
    content: `<p>For users outside the United States:</p>
              <ul>
                <li>Our services are based in the United States</li>
                <li>You are responsible for compliance with local laws</li>
                <li>Data transfers comply with applicable cross-border transfer regulations</li>
                <li>Currency conversion rates are set by our payment processors</li>
                <li>Availability of features may vary by region</li>
              </ul>
              <p>By using our services, you consent to the transfer of data to the United States.</p>`
  },
  {
    title: "Third-Party Services",
    content: `<p>Regarding external services:</p>
              <ul>
                <li>Our platform may contain links to third-party websites</li>
                <li>We integrate with external services like payment processors</li>
                <li>We are not responsible for third-party content or practices</li>
                <li>Third-party services have their own terms of service</li>
                <li>Your use of third-party services is at your own risk</li>
              </ul>
              <p>We recommend reviewing third-party terms before using their services.</p>`
  },
  {
    title: "Amendments to Terms",
    content: `<p>Regarding changes to these terms:</p>
              <ul>
                <li>We may update these terms from time to time</li>
                <li>Material changes will be notified via email or platform announcement</li>
                <li>The "Last Updated" date at the top will reflect changes</li>
                <li>Continued use after changes constitutes acceptance</li>
                <li>If you disagree with new terms, you must stop using our services</li>
              </ul>
              <p>Current terms are always available at <a href="/terms">evenza.com/terms</a>.</p>`
  },
  ];

  constructor(private router: Router) {}
   navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }
  
}
