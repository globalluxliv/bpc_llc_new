// src/lib/agents.ts
export interface Agent {
  id: number;
  name: string;
  title: string;
  cell: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    name: "Akm Mike Bhuiyan",
    title: "Licensed Principal Broker",
    cell: "347.248.9726",
    phone: "212.884.2211",
    email: "mbhuiyan@bpcre­sidential.com",
    image: "/agents/mike.png",
    bio: `As a resident of New York for over 34 years, Mike Bhuiyan has extensive experience specializing in the ins and outs of this city. As a top-producing broker, his goal is to find his clients the best solutions using his dynamic ability to anticipate his client’s needs and exceeding their expectations every single time. Whether dealing with buyers or sellers, his strong knowledge of New York City’s neighborhoods, combined with his consistent history of making a deal happen, has earned him his growing success and set him apart as a top-ranking broker at DJK Residential. Prior to his successful real estate career, Mike has owned a national designer fashion business in the Garment District for over a decade. He is also very dedicated to community service. Utilizing his fluency in English, Bengali, Hindi, Urdu, Spanish, and Portuguese, Mike has travelled to over 82 countries with various interests and has established a school and college for the economically disadvantaged. In his free time, he is a Certified Leadership Trainer and Senator of the Junior Chamber International, Past District Governor for Lions Clubs International District 20-R2 New York, Progressive Melvin Jones Fellow of Lions Clubs International, Founder Presidents [ of District 20-R2 Foundation, Manhattan Downtown Community Alliance, Manhattan Downtown Multicultural Food Pantry and member of Real Estate Board of New York, Manhattan Association of Realtors, New York State Association of Realtors and National Association of Realtors.`
  },
  {
    id: 2,
    name: "Lixi Ma (Queenie)",
    title: "Licensed Sales Person",
    cell: "646.285.8277",
    phone: "212.884.2211",
    email: "queenie@bpcre­sidential.com",
    image: "/agents/queenie.png",
    bio: `Queenie Ma is a Real Estate professional licensed sales agent in New York City for over 12 years. Her expertise are sale, purchase, rental in residential, commercial and management condominiums and buildings. Queenie lives in the Battery Park City more than 25 years. She has grown to love, living in New York City after immigrated from China. For all these years live in the City, she has developed strong relationships with clients, owners, and real estate community fellows. Queenie is a very active and more productive RE professional in New York. She treats all her local and international clients as family members and willing to provide additional supports in the field. I am proud to be a team member of Battery Park City Residential LLC. You’re very welcome to contact us for your Real Estate needs and get some professional advices. Hope to meet you soon!`
  },
  {
    id: 3,
    name: "Stefanie Kolokotsas",
    title: "Licensed Real Estate Sales Person",
    cell: "347.853.0503",
    phone: "212.884.2211",
    email: "stefaniek@bpcresidential.com",
    image: "/agents/Stephanie.png",
    bio: `Born and raised in Williamsburg, Brooklyn, Stefanie's love of her hometown of New York City began at a very young age with weekend trips to "the city" to go shopping with her mother and take in the sights of Macy's 34th Street. Her extensive knowledge of New York City, along with having spent the last 15 years at some of the world's top Wall Street firms, including Deutsche Bank, Goldman Sachs, and the Nasdaq Stock Exchange, has given her the expertise and drive to always put a client's needs first. Stefanie has a proven track record of being investment-minded while taking pride in the strong trust-based relationships she builds with clients and peers. She will guide you through your search with the utmost integrity she brings to everything she does in true Native New Yorker fashion. She is a member of the Real Estate Board of New York and a proud resident of Battery Park City, where she lives with her dog, Zeus.`
  }
];
