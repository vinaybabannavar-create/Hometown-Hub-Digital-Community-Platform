// Comprehensive Mock Data for Hometown Hub Digital Community Platform
// Includes sample users, communities, posts, comments, events, and reports.

export const initialUsers = [
  {
    id: "usr_platform_admin",
    name: "Rajesh Kumar",
    email: "admin@hometownhub.com",
    role: "platform_admin",
    hometown: "Palampur, Himachal Pradesh",
    currentLocation: "Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Global Platform Administrator for Hometown Hub. Dedicated to preserving community values.",
    joinedDate: "2025-01-10",
  },
  {
    id: "usr_wayanad_admin",
    name: "Devi Nair",
    email: "devi.nair@hometownhub.com",
    role: "community_admin",
    hometown: "Wayanad, Kerala",
    currentLocation: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Admin of Wayanad Community Hub. Proud Kerala native working in tech in Bangalore.",
    joinedDate: "2025-02-15",
  },
  {
    id: "usr_hampi_admin",
    name: "Vijay Rao",
    email: "vijay@hometownhub.com",
    role: "community_admin",
    hometown: "Hampi, Karnataka",
    currentLocation: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Hampi heritage coordinator. Passionate about preserving historical monuments and local folklore.",
    joinedDate: "2025-03-01",
  },
  {
    id: "usr_standard_priya",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    role: "user",
    hometown: "Wayanad, Kerala",
    currentLocation: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Software Engineer who loves Wayanad tea and missing home. Let's connect!",
    joinedDate: "2025-03-15",
  },
  {
    id: "usr_standard_arjun",
    name: "Arjun Verma",
    email: "arjun@gmail.com",
    role: "user",
    hometown: "Palampur, Himachal Pradesh",
    currentLocation: "Chandigarh",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Himalayan trekker and tea planter from Palampur. Currently doing MBA in Chandigarh.",
    joinedDate: "2025-03-20",
  },
  {
    id: "usr_pandit_shastri",
    name: "Ramesh Shastri",
    email: "shastri.pandit@gmail.com",
    role: "pandit",
    hometown: "Palampur, Himachal Pradesh",
    currentLocation: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Local cultural guide, community facilitator, and priest. Helping folks maintain their traditional roots.",
    joinedDate: "2025-04-01",
  }
];

export const initialCommunities = [
  {
    id: "comm_wayanad",
    name: "Wayanad Heritage Hub",
    cityVillage: "Wayanad",
    state: "Kerala",
    description: "A digital space for Wayanad natives worldwide. Discuss local news, agricultural updates (Coffee & Spices), organize monsoon festivals, and help each other reconnect with our roots.",
    memberCount: 342,
    createdDate: "2025-02-15",
    creatorId: "usr_wayanad_admin",
    adminId: "usr_wayanad_admin",
    bannerImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isApproved: true,
    rules: [
      "Be respectful and supportive of all community members.",
      "Share verified news and hyperlocal updates only.",
      "No spam, promotions, or commercial advertisements.",
      "Celebrate local arts, crafts, coffee planting, and traditions."
    ],
    members: ["usr_wayanad_admin", "usr_standard_priya", "usr_platform_admin"]
  },
  {
    id: "comm_hampi",
    name: "Hampi Chronicles",
    cityVillage: "Hampi",
    state: "Karnataka",
    description: "Connecting residents and heritage enthusiasts of Hampi. Join for local archaeology chats, tourism updates, craft markets, and traditional festival coordination.",
    memberCount: 156,
    createdDate: "2025-03-01",
    creatorId: "usr_hampi_admin",
    adminId: "usr_hampi_admin",
    bannerImage: "https://images.unsplash.com/photo-1600100397990-a4a9844c8038?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isApproved: true,
    rules: [
      "Maintain the dignity of Hampi's historical heritage.",
      "Help guide visitors and promote local artisans.",
      "No abusive language or political debates."
    ],
    members: ["usr_hampi_admin", "usr_platform_admin"]
  },
  {
    id: "comm_palampur",
    name: "Palampur Tea & Pines",
    cityVillage: "Palampur",
    state: "Himachal Pradesh",
    description: "Welcome to the capital of green tea and pine scents! Bringing together Palampur folk living across the globe. Join for snow weather updates, crop seasons, and Himachali Dham planning.",
    memberCount: 228,
    createdDate: "2025-03-25",
    creatorId: "usr_platform_admin",
    adminId: "usr_platform_admin",
    bannerImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isApproved: true,
    rules: [
      "Keep the conversation friendly and helpful.",
      "No commercial property advertisements without admin consent.",
      "Respect mountain conservation guidelines and share ecotourism tips."
    ],
    members: ["usr_platform_admin", "usr_standard_arjun", "usr_pandit_shastri"]
  }
];

export const initialPosts = [
  {
    id: "post_1",
    communityId: "comm_wayanad",
    userId: "usr_wayanad_admin",
    userName: "Devi Nair",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "🌾 Monsoon Agricultural Alert: Local coffee growers, please note that the agricultural department is providing subsidies for eco-friendly bean dryers this season. Apply at the district office before June 15th. Let's make sure our crop quality stays top-notch despite heavy rain forecasts!",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 24,
    likedBy: ["usr_standard_priya", "usr_platform_admin"],
    isAnnouncement: true,
    isPinned: true,
    createdDate: "2026-05-25T14:30:00Z",
    comments: [
      {
        id: "c1_1",
        userId: "usr_standard_priya",
        userName: "Priya Sharma",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "This is wonderful! My uncle runs a small estate near Vythiri and was struggling to dry beans last year. I will forward this information to him immediately. Thank you, Devi!",
        createdDate: "2026-05-25T15:10:00Z"
      },
      {
        id: "c1_2",
        userId: "usr_platform_admin",
        userName: "Rajesh Kumar",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "Excellent initiative. Hyperlocal announcements like this are exactly why this platform exists.",
        createdDate: "2026-05-25T16:00:00Z"
      }
    ]
  },
  {
    id: "post_2",
    communityId: "comm_wayanad",
    userId: "usr_standard_priya",
    userName: "Priya Sharma",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Missing the misty Wayanad hills today! Sitting in a crowded office in Bangalore, and all I can think about is the hot parotta and beef fry from the local joints back home. Anyone else from Wayanad currently in Bangalore? Let's plan a weekend meetup and grab some home-style food!",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 18,
    likedBy: ["usr_wayanad_admin"],
    isAnnouncement: false,
    isPinned: false,
    createdDate: "2026-05-26T09:15:00Z",
    comments: [
      {
        id: "c2_1",
        userId: "usr_wayanad_admin",
        userName: "Devi Nair",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "Oh, count me in! I know a brilliant spot in HSR Layout that serves actual Wayanad style spices. Let's coordinate!",
        createdDate: "2026-05-26T10:05:00Z"
      }
    ]
  },
  {
    id: "post_3",
    communityId: "comm_palampur",
    userId: "usr_standard_arjun",
    userName: "Arjun Verma",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "Beautiful sunrise over the Dhauladhar range in Palampur this morning, sent by my father! The snow cap is still visible. Makes me so homesick. Cherishing these pines from afar! 🌲🏔️",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 35,
    likedBy: ["usr_platform_admin", "usr_pandit_shastri"],
    isAnnouncement: false,
    isPinned: false,
    createdDate: "2026-05-26T07:20:00Z",
    comments: [
      {
        id: "c3_1",
        userId: "usr_pandit_shastri",
        userName: "Ramesh Shastri",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "What a stunning view, Arjun! The temperature here in Mumbai is boiling, but looking at this gives my soul instant peace. Jai Hind!",
        createdDate: "2026-05-26T08:00:00Z"
      }
    ]
  }
];

export const initialEvents = [
  {
    id: "evt_1",
    communityId: "comm_wayanad",
    title: "Wayanad Monsoon Heritage Festival 2026",
    description: "Bringing our traditional monsoon games, food stalls, and agricultural exhibition online and offline! For those of us located in Bangalore, we will gather at the Kerala Samajam Hall in Indiranagar, while local members will broadcast live from Kalpetta! Join us for a feast of Karkidaka Kanji, traditional archery contests, and local folk music.",
    location: "Indiranagar, Bangalore & Live from Kalpetta",
    date: "2026-06-21",
    time: "10:00 AM - 6:00 PM",
    organizerId: "usr_wayanad_admin",
    organizerName: "Devi Nair",
    attendees: ["usr_wayanad_admin", "usr_standard_priya", "usr_platform_admin"],
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Culture"
  },
  {
    id: "evt_2",
    communityId: "comm_palampur",
    title: "Himachali Dham Feast & Reconnect",
    description: "Missing the taste of Kangri Dham? We are organizing an authentic community feast with Kangri Madra, Sepu Badi, and sweet rice cooked by specialized Himachali chefs. Let's gather, chat in Himachali, listen to traditional Nati songs, and connect with fellow youngsters from Palampur.",
    location: "Himachal Bhawan, Sector 28, Chandigarh",
    date: "2026-06-14",
    time: "12:30 PM - 4:30 PM",
    organizerId: "usr_pandit_shastri",
    organizerName: "Ramesh Shastri",
    attendees: ["usr_pandit_shastri", "usr_standard_arjun", "usr_platform_admin"],
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Food & Social"
  }
];

// Special community guide / local expert "Pandit Onboarding" requests
export const initialPanditApplications = [
  {
    id: "pnd_app_1",
    panditName: "Ramesh Shastri",
    email: "shastri.pandit@gmail.com",
    hometown: "Palampur, Himachal Pradesh",
    proposedCommunityName: "Palampur Divine & Ancient Heritage",
    cityVillage: "Palampur",
    state: "Himachal Pradesh",
    description: "Aiming to build a special sanctuary group dedicated to compiling local folktales, historical temples, traditional recipes (Dham recipes), and connecting elderly storytellers with migrating youths.",
    initialMemberCount: 45,
    createdDate: "2026-05-24",
    status: "pending", // pending, approved, rejected
    credentialsLink: "https://example.com/credentials_shastri.pdf"
  },
  {
    id: "pnd_app_2",
    panditName: "Sunita Deshmukh",
    email: "sunita.d@gmail.com",
    hometown: "Mahuva, Gujarat",
    proposedCommunityName: "Mahuva Coconut & Onion Co-op Hub",
    cityVillage: "Mahuva",
    state: "Gujarat",
    description: "Developing a direct-to-migrant channel for Mahuva's famous dehydrated onions, mangoes, and handicraft. Helping migrants buy directly from their village farmers and sustain local growers.",
    initialMemberCount: 88,
    createdDate: "2026-05-26",
    status: "pending",
    credentialsLink: "https://example.com/credentials_sunita.pdf"
  }
];

// User Abuse Reports / Flagged content
export const initialAbuseReports = [
  {
    id: "rep_1",
    reporterName: "Priya Sharma",
    reportedContentId: "post_spam_99",
    reportedType: "post", // post or comment
    reason: "Offensive political content unrelated to our hometown rules.",
    contentPreview: "Buy bitcoin cheap, free cash! Call this WhatsApp number immediately...",
    createdDate: "2026-05-26",
    status: "pending" // pending, resolved_removed, resolved_kept
  }
];

// Content tags defined by platform admin
export const initialTags = ["Culture", "Local News", "Agriculture", "Food & Feast", "Travel & Weather", "Job Exchange", "Traditions", "Reunion"];

// Pending community creation requests from general users
export const initialCommunityRequests = [
  {
    id: "req_comm_1",
    name: "Palampur Heritage Club",
    cityVillage: "Palampur",
    state: "Himachal Pradesh",
    description: "Focused on preserving the local mountain paths and forest trails.",
    creatorName: "Arjun Verma",
    createdDate: "2026-05-25",
    status: "pending"
  }
];
