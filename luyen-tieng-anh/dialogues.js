// Ngân hàng hội thoại tiếng Anh Mỹ thông dụng — xoay vòng theo ngày (offline, không cần Internet).
// Mỗi phần tử: 1 hội thoại đời thường, có bản dịch tiếng Việt + từ vựng trọng tâm.
const DIALOGUE_BANK = [
  {
    title_en: "Ordering Coffee",
    title_vi: "Gọi cà phê",
    tags: ["quán xá", "beginner"],
    lines: [
      { s: "Barista", en: "Hi there! What can I get started for you today?", vi: "Chào bạn! Bạn muốn dùng gì ạ?" },
      { s: "Customer", en: "Can I get a medium iced latte with oat milk, please?", vi: "Cho mình một ly latte đá cỡ vừa với sữa yến mạch nhé." },
      { s: "Barista", en: "Sure thing. Would you like that sweetened or unsweetened?", vi: "Được ạ. Bạn muốn cho đường hay không đường?" },
      { s: "Customer", en: "Unsweetened is fine. Also, do you have any pastries left?", vi: "Không đường là được rồi. Bạn còn bánh ngọt nào không?" },
      { s: "Barista", en: "We've got blueberry muffins and croissants.", vi: "Bọn mình còn muffin việt quất và bánh sừng bò." },
      { s: "Customer", en: "I'll take a croissant too. How much is that altogether?", vi: "Mình lấy thêm một cái croissant. Tổng cộng bao nhiêu vậy?" },
      { s: "Barista", en: "That'll be seven fifty. For here or to go?", vi: "Tổng là 7.50 đô. Bạn dùng tại quán hay mang đi?" },
      { s: "Customer", en: "To go, thanks. Here's my card.", vi: "Mang đi giúp mình, cảm ơn. Đây là thẻ của mình." }
    ],
    vocab: [
      { w: "What can I get started for you?", m: "Câu chào mở đầu khi order, nghĩa gần với 'Bạn muốn dùng gì?'" },
      { w: "sweetened / unsweetened", m: "có đường / không đường" },
      { w: "pastries", m: "bánh ngọt nói chung" },
      { w: "for here or to go", m: "dùng tại chỗ hay mang đi" },
      { w: "altogether", m: "tổng cộng" }
    ]
  },
  {
    title_en: "Small Talk with a Neighbor",
    title_vi: "Tán gẫu với hàng xóm",
    tags: ["giao tiếp xã hội", "beginner"],
    lines: [
      { s: "Alex", en: "Hey Sam, long time no see! How have you been?", vi: "Chào Sam, lâu rồi không gặp! Dạo này bạn thế nào?" },
      { s: "Sam", en: "Pretty good, thanks. Just been busy with work. How about you?", vi: "Cũng ổn, cảm ơn. Mình bận công việc suốt. Còn bạn thì sao?" },
      { s: "Alex", en: "Can't complain. Did you catch the game last night?", vi: "Cũng không có gì phàn nàn. Bạn có xem trận đấu tối qua không?" },
      { s: "Sam", en: "I did! It was such a close match, right down to the wire.", vi: "Có chứ! Trận đó sát nút luôn, tới phút cuối mới ngã ngũ." },
      { s: "Alex", en: "Tell me about it. My heart was racing the whole time.", vi: "Đúng vậy đó. Tim mình đập liên hồi suốt trận." },
      { s: "Sam", en: "Anyway, I should get going. Let's grab coffee sometime.", vi: "Thôi mình phải đi đây. Khi nào rảnh đi uống cà phê nha." },
      { s: "Alex", en: "Sounds great. Take care!", vi: "Nghe hay đó. Bảo trọng nhé!" }
    ],
    vocab: [
      { w: "long time no see", m: "lâu rồi không gặp" },
      { w: "can't complain", m: "cũng ổn, không có gì than phiền" },
      { w: "down to the wire", m: "sát nút, đến phút chót" },
      { w: "tell me about it", m: "đúng vậy đó (đồng tình mạnh)" },
      { w: "grab coffee", m: "đi uống cà phê" }
    ]
  },
  {
    title_en: "Asking for Directions",
    title_vi: "Hỏi đường",
    tags: ["di chuyển", "beginner"],
    lines: [
      { s: "Tourist", en: "Excuse me, could you tell me how to get to the train station?", vi: "Xin lỗi, bạn có thể chỉ đường tới ga tàu không?" },
      { s: "Local", en: "Sure. Go straight for two blocks, then turn left on Main Street.", vi: "Được chứ. Bạn đi thẳng hai dãy nhà, rồi rẽ trái vào đường Main." },
      { s: "Tourist", en: "Two blocks, then left. Is it far from there?", vi: "Hai dãy nhà rồi rẽ trái. Từ đó có xa không?" },
      { s: "Local", en: "Not at all, it's right across from the library.", vi: "Không xa đâu, nó nằm ngay đối diện thư viện." },
      { s: "Tourist", en: "Great, thank you so much for your help.", vi: "Tuyệt, cảm ơn bạn rất nhiều." },
      { s: "Local", en: "No problem. Have a safe trip!", vi: "Không có gì. Chúc chuyến đi an toàn nhé!" }
    ],
    vocab: [
      { w: "go straight", m: "đi thẳng" },
      { w: "block", m: "dãy nhà/khu phố (đơn vị khoảng cách trong thành phố)" },
      { w: "right across from", m: "ngay đối diện" },
      { w: "have a safe trip", m: "chúc đi đường bình an" }
    ]
  },
  {
    title_en: "Making a Phone Reservation",
    title_vi: "Gọi điện đặt bàn",
    tags: ["điện thoại", "intermediate"],
    lines: [
      { s: "Staff", en: "Thank you for calling Riverside Grill, how can I help you?", vi: "Cảm ơn đã gọi đến Riverside Grill, tôi có thể giúp gì cho bạn?" },
      { s: "Caller", en: "Hi, I'd like to make a reservation for four people tonight.", vi: "Chào, tôi muốn đặt bàn cho 4 người tối nay." },
      { s: "Staff", en: "Of course. What time were you thinking?", vi: "Được ạ. Anh/chị định đến lúc mấy giờ?" },
      { s: "Caller", en: "Around seven thirty, if that's available.", vi: "Khoảng 7 giờ 30, nếu còn chỗ." },
      { s: "Staff", en: "Let me check... yes, we have a table open at that time.", vi: "Để tôi kiểm tra... vâng, lúc đó vẫn còn bàn trống." },
      { s: "Caller", en: "Perfect. Could we get a table by the window?", vi: "Tuyệt. Cho tôi xin bàn gần cửa sổ được không?" },
      { s: "Staff", en: "I'll do my best. Can I get a name for the reservation?", vi: "Tôi sẽ cố gắng sắp xếp. Cho tôi xin tên để đặt bàn?" },
      { s: "Caller", en: "It's under Jordan, J-O-R-D-A-N.", vi: "Tên là Jordan, đánh vần J-O-R-D-A-N." }
    ],
    vocab: [
      { w: "make a reservation", m: "đặt chỗ/đặt bàn" },
      { w: "available", m: "còn trống, có sẵn" },
      { w: "I'll do my best", m: "tôi sẽ cố hết sức" },
      { w: "under [name]", m: "đặt dưới tên..." }
    ]
  },
  {
    title_en: "Job Interview Basics",
    title_vi: "Phỏng vấn xin việc",
    tags: ["công việc", "intermediate"],
    lines: [
      { s: "Interviewer", en: "So, tell me a little about yourself.", vi: "Vậy, bạn hãy giới thiệu đôi chút về bản thân." },
      { s: "Candidate", en: "Sure. I've been working in marketing for about three years, mostly on social media campaigns.", vi: "Vâng. Tôi đã làm marketing khoảng 3 năm, chủ yếu về các chiến dịch mạng xã hội." },
      { s: "Interviewer", en: "What would you say is your biggest strength?", vi: "Bạn nghĩ điểm mạnh lớn nhất của mình là gì?" },
      { s: "Candidate", en: "I'd say I'm really good at managing multiple projects at once without missing deadlines.", vi: "Tôi nghĩ mình giỏi trong việc quản lý nhiều dự án cùng lúc mà không trễ hạn." },
      { s: "Interviewer", en: "That's great. Why are you interested in this position?", vi: "Tuyệt vời. Vì sao bạn quan tâm đến vị trí này?" },
      { s: "Candidate", en: "I've always admired this company's work, and I think my skills are a great fit.", vi: "Tôi luôn ngưỡng mộ công việc của công ty, và tôi nghĩ kỹ năng của mình rất phù hợp." },
      { s: "Interviewer", en: "Do you have any questions for me?", vi: "Bạn có câu hỏi nào cho tôi không?" },
      { s: "Candidate", en: "Yes, what does a typical day look like for this role?", vi: "Có, một ngày làm việc điển hình cho vị trí này thế nào?" }
    ],
    vocab: [
      { w: "strength", m: "điểm mạnh" },
      { w: "deadline", m: "hạn chót" },
      { w: "a great fit", m: "sự phù hợp tốt" },
      { w: "typical day", m: "một ngày làm việc điển hình" }
    ]
  },
  {
    title_en: "At the Doctor's Office",
    title_vi: "Ở phòng khám bác sĩ",
    tags: ["sức khỏe", "intermediate"],
    lines: [
      { s: "Doctor", en: "What seems to be the problem today?", vi: "Hôm nay bạn gặp vấn đề gì vậy?" },
      { s: "Patient", en: "I've had a sore throat and a slight fever since yesterday.", vi: "Tôi bị đau họng và sốt nhẹ từ hôm qua." },
      { s: "Doctor", en: "I see. Are you experiencing any other symptoms, like a cough?", vi: "Tôi hiểu rồi. Bạn có triệu chứng nào khác không, như là ho?" },
      { s: "Patient", en: "A little bit, and I feel pretty tired overall.", vi: "Có một chút, và tôi cảm thấy khá mệt mỏi." },
      { s: "Doctor", en: "Let me take a look. Open your mouth and say 'ah'.", vi: "Để tôi xem qua. Hãy mở miệng và nói 'ah'." },
      { s: "Doctor", en: "It looks like a mild throat infection. I'll prescribe some medicine.", vi: "Có vẻ như bị viêm họng nhẹ. Tôi sẽ kê thuốc cho bạn." },
      { s: "Patient", en: "Thank you. How long should I take it for?", vi: "Cảm ơn bác sĩ. Tôi nên uống thuốc trong bao lâu?" },
      { s: "Doctor", en: "Take it twice a day for five days, and get plenty of rest.", vi: "Uống 2 lần một ngày trong 5 ngày, và nghỉ ngơi thật nhiều." }
    ],
    vocab: [
      { w: "sore throat", m: "đau họng" },
      { w: "symptom", m: "triệu chứng" },
      { w: "prescribe", m: "kê đơn thuốc" },
      { w: "get plenty of rest", m: "nghỉ ngơi đầy đủ" }
    ]
  },
  {
    title_en: "Checking In at a Hotel",
    title_vi: "Nhận phòng khách sạn",
    tags: ["du lịch", "beginner"],
    lines: [
      { s: "Receptionist", en: "Welcome! Do you have a reservation with us?", vi: "Chào mừng! Bạn có đặt phòng trước không?" },
      { s: "Guest", en: "Yes, it's under the name Nguyen, for two nights.", vi: "Có, dưới tên Nguyen, đặt 2 đêm." },
      { s: "Receptionist", en: "Let me pull that up... great, I've got your room ready. May I see your ID?", vi: "Để tôi tra lại... tuyệt, phòng của bạn đã sẵn sàng. Cho tôi xem giấy tờ tùy thân được không?" },
      { s: "Guest", en: "Here you go. Is breakfast included?", vi: "Đây ạ. Có bao gồm bữa sáng không?" },
      { s: "Receptionist", en: "Yes, breakfast is served from seven to ten in the lobby restaurant.", vi: "Có, bữa sáng phục vụ từ 7 đến 10 giờ tại nhà hàng ở sảnh." },
      { s: "Guest", en: "Perfect. What's the Wi-Fi password?", vi: "Tuyệt. Mật khẩu Wi-Fi là gì vậy?" },
      { s: "Receptionist", en: "It's printed on your key card sleeve. Enjoy your stay!", vi: "Nó được in trên vỏ thẻ phòng của bạn. Chúc bạn có kỳ nghỉ vui vẻ!" }
    ],
    vocab: [
      { w: "reservation", m: "đặt trước (phòng, bàn...)" },
      { w: "pull that up", m: "tra cứu thông tin đó lên" },
      { w: "included", m: "được bao gồm" },
      { w: "key card sleeve", m: "vỏ đựng thẻ phòng" }
    ]
  },
  {
    title_en: "Returning an Item at a Store",
    title_vi: "Trả hàng tại cửa hàng",
    tags: ["mua sắm", "intermediate"],
    lines: [
      { s: "Customer", en: "Hi, I'd like to return this jacket. It doesn't fit quite right.", vi: "Chào, tôi muốn trả lại áo khoác này. Nó không vừa lắm." },
      { s: "Clerk", en: "No problem. Do you have your receipt?", vi: "Không sao. Bạn còn giữ hóa đơn không?" },
      { s: "Customer", en: "Yes, right here. I bought it about a week ago.", vi: "Có, đây ạ. Tôi mua nó khoảng một tuần trước." },
      { s: "Clerk", en: "Great, that's within our thirty-day return window. Would you like a refund or an exchange?", vi: "Tốt, vẫn trong thời hạn trả hàng 30 ngày của chúng tôi. Bạn muốn hoàn tiền hay đổi hàng?" },
      { s: "Customer", en: "I'd like to exchange it for a larger size, please.", vi: "Tôi muốn đổi sang size lớn hơn." },
      { s: "Clerk", en: "Sure thing, let me check what we have in stock.", vi: "Được ạ, để tôi kiểm tra hàng còn trong kho." }
    ],
    vocab: [
      { w: "return", m: "trả hàng" },
      { w: "receipt", m: "hóa đơn" },
      { w: "refund / exchange", m: "hoàn tiền / đổi hàng" },
      { w: "in stock", m: "còn hàng trong kho" }
    ]
  },
  {
    title_en: "Planning a Weekend Trip",
    title_vi: "Lên kế hoạch đi chơi cuối tuần",
    tags: ["bạn bè", "beginner"],
    lines: [
      { s: "Jamie", en: "Hey, are you free this weekend? I was thinking we could go hiking.", vi: "Này, cuối tuần này bạn rảnh không? Mình đang nghĩ tụi mình có thể đi leo núi." },
      { s: "Taylor", en: "That sounds fun! Which trail were you thinking of?", vi: "Nghe hay đó! Bạn định đi con đường mòn nào?" },
      { s: "Jamie", en: "Maybe the one near Eagle Lake. It's supposed to have a great view.", vi: "Có thể là con đường gần Eagle Lake. Nghe nói cảnh ở đó rất đẹp." },
      { s: "Taylor", en: "I'm in. What time should we head out?", vi: "Mình tham gia. Mấy giờ tụi mình xuất phát?" },
      { s: "Jamie", en: "Let's leave early, around seven, to beat the crowds.", vi: "Xuất phát sớm đi, khoảng 7 giờ, để tránh đông người." },
      { s: "Taylor", en: "Works for me. I'll bring some snacks and water.", vi: "Được đó. Mình sẽ mang theo đồ ăn nhẹ và nước." }
    ],
    vocab: [
      { w: "I'm in", m: "mình tham gia" },
      { w: "head out", m: "xuất phát, lên đường" },
      { w: "beat the crowds", m: "tránh đám đông" },
      { w: "works for me", m: "hợp với mình, ổn với mình" }
    ]
  },
  {
    title_en: "Tech Support Call",
    title_vi: "Gọi hỗ trợ kỹ thuật",
    tags: ["điện thoại", "intermediate"],
    lines: [
      { s: "Agent", en: "Thanks for calling tech support. What issue are you experiencing?", vi: "Cảm ơn đã gọi đến bộ phận hỗ trợ kỹ thuật. Bạn đang gặp vấn đề gì?" },
      { s: "Customer", en: "My laptop keeps freezing every time I open a browser.", vi: "Laptop của tôi cứ bị đơ mỗi khi tôi mở trình duyệt." },
      { s: "Agent", en: "I understand. Have you tried restarting the computer?", vi: "Tôi hiểu rồi. Bạn đã thử khởi động lại máy chưa?" },
      { s: "Customer", en: "Yes, I restarted it twice, but the problem keeps happening.", vi: "Rồi, tôi khởi động lại hai lần rồi, nhưng vấn đề vẫn xảy ra." },
      { s: "Agent", en: "Okay, let's try updating your browser. Can you check the version?", vi: "Được rồi, chúng ta thử cập nhật trình duyệt nhé. Bạn kiểm tra phiên bản được không?" },
      { s: "Customer", en: "Sure, one moment... it says it's out of date.", vi: "Được, chờ chút... nó báo là đã lỗi thời." },
      { s: "Agent", en: "That's likely the cause. Go ahead and update it, then restart.", vi: "Đó chắc là nguyên nhân. Bạn cập nhật rồi khởi động lại nhé." }
    ],
    vocab: [
      { w: "freeze", m: "(máy tính) bị đơ, đứng máy" },
      { w: "restart", m: "khởi động lại" },
      { w: "out of date", m: "đã lỗi thời, chưa cập nhật" },
      { w: "the cause", m: "nguyên nhân" }
    ]
  },
  {
    title_en: "At the Airport Check-in Counter",
    title_vi: "Làm thủ tục tại sân bay",
    tags: ["du lịch", "intermediate"],
    lines: [
      { s: "Agent", en: "Good morning! Can I see your passport and ticket, please?", vi: "Chào buổi sáng! Cho tôi xem hộ chiếu và vé của bạn nhé?" },
      { s: "Passenger", en: "Here you go. I'd also like to check one bag.", vi: "Đây ạ. Tôi cũng muốn ký gửi một kiện hành lý." },
      { s: "Agent", en: "Alright, please place it on the scale.", vi: "Được rồi, bạn đặt nó lên cân giúp tôi." },
      { s: "Passenger", en: "Sure. Is it within the weight limit?", vi: "Được. Nó có trong giới hạn cân nặng không?" },
      { s: "Agent", en: "Yes, it's right at twenty kilograms. Here's your boarding pass.", vi: "Có, đúng 20 kg. Đây là thẻ lên máy bay của bạn." },
      { s: "Passenger", en: "Thanks. Which gate should I go to?", vi: "Cảm ơn. Tôi nên đến cổng nào?" },
      { s: "Agent", en: "Gate twenty-two. Boarding starts an hour before departure.", vi: "Cổng 22. Việc lên máy bay bắt đầu một tiếng trước giờ khởi hành." }
    ],
    vocab: [
      { w: "check a bag", m: "ký gửi hành lý" },
      { w: "weight limit", m: "giới hạn cân nặng" },
      { w: "boarding pass", m: "thẻ lên máy bay" },
      { w: "departure", m: "giờ khởi hành" }
    ]
  },
  {
    title_en: "Talking About the Weather",
    title_vi: "Nói chuyện về thời tiết",
    tags: ["giao tiếp xã hội", "beginner"],
    lines: [
      { s: "Chris", en: "Can you believe how hot it's been this week?", vi: "Bạn có tin nổi tuần này nóng cỡ nào không?" },
      { s: "Robin", en: "I know, it's been in the nineties every day.", vi: "Đúng vậy, ngày nào cũng gần 35-37 độ C." },
      { s: "Chris", en: "I heard it might cool down over the weekend, though.", vi: "Nhưng mình nghe nói cuối tuần có thể mát hơn." },
      { s: "Robin", en: "That would be a relief. I'm so tired of the humidity.", vi: "Vậy thì đỡ quá. Mình chán độ ẩm này lắm rồi." },
      { s: "Chris", en: "Same here. At least it's supposed to rain a little, which should help.", vi: "Mình cũng vậy. Ít nhất nghe nói sẽ có mưa nhẹ, chắc sẽ đỡ hơn." }
    ],
    vocab: [
      { w: "in the nineties", m: "nhiệt độ khoảng 90-99°F (~32-37°C)" },
      { w: "cool down", m: "mát hơn, hạ nhiệt" },
      { w: "a relief", m: "sự nhẹ nhõm" },
      { w: "humidity", m: "độ ẩm" }
    ]
  },
  {
    title_en: "Ordering Food Delivery",
    title_vi: "Đặt đồ ăn giao tận nơi",
    tags: ["quán xá", "beginner"],
    lines: [
      { s: "Operator", en: "Thanks for calling Tony's Pizza. What can I get for you?", vi: "Cảm ơn đã gọi đến Tony's Pizza. Bạn muốn đặt gì ạ?" },
      { s: "Customer", en: "I'd like a large pepperoni pizza and a side of garlic bread.", vi: "Tôi muốn một pizza pepperoni cỡ lớn và một phần bánh mì tỏi." },
      { s: "Operator", en: "Got it. Would you like any drinks with that?", vi: "Rõ rồi. Bạn có muốn thêm nước uống không?" },
      { s: "Customer", en: "Yeah, a two-liter bottle of soda, please.", vi: "Có, cho tôi một chai nước ngọt 2 lít." },
      { s: "Operator", en: "Alright. Can I get your address for delivery?", vi: "Được rồi. Cho tôi xin địa chỉ để giao hàng?" },
      { s: "Customer", en: "It's 45 Maple Street, apartment 3B.", vi: "Địa chỉ là 45 đường Maple, căn hộ 3B." },
      { s: "Operator", en: "Perfect, that'll be about thirty minutes.", vi: "Tuyệt, sẽ mất khoảng 30 phút." }
    ],
    vocab: [
      { w: "a side of", m: "một phần ăn kèm" },
      { w: "delivery", m: "giao hàng" },
      { w: "apartment", m: "căn hộ" },
      { w: "that'll be about...", m: "sẽ mất khoảng... (thời gian)" }
    ]
  },
  {
    title_en: "At the Bank",
    title_vi: "Tại ngân hàng",
    tags: ["tài chính", "intermediate"],
    lines: [
      { s: "Teller", en: "Hi, how can I help you today?", vi: "Chào, tôi có thể giúp gì cho bạn hôm nay?" },
      { s: "Customer", en: "I'd like to open a savings account, please.", vi: "Tôi muốn mở một tài khoản tiết kiệm." },
      { s: "Teller", en: "Sure. Do you already have a checking account with us?", vi: "Được ạ. Bạn đã có tài khoản thanh toán ở đây chưa?" },
      { s: "Customer", en: "No, this would be my first account here.", vi: "Chưa, đây sẽ là tài khoản đầu tiên của tôi ở đây." },
      { s: "Teller", en: "No problem, I'll just need your ID and proof of address.", vi: "Không sao, tôi chỉ cần giấy tờ tùy thân và giấy chứng minh địa chỉ của bạn." },
      { s: "Customer", en: "Here they are. Is there a minimum deposit?", vi: "Đây ạ. Có yêu cầu số tiền gửi tối thiểu không?" },
      { s: "Teller", en: "Yes, it's twenty-five dollars to open the account.", vi: "Có, cần 25 đô để mở tài khoản." }
    ],
    vocab: [
      { w: "savings / checking account", m: "tài khoản tiết kiệm / tài khoản thanh toán" },
      { w: "proof of address", m: "giấy chứng minh địa chỉ" },
      { w: "minimum deposit", m: "số tiền gửi tối thiểu" }
    ]
  },
  {
    title_en: "Meeting a New Coworker",
    title_vi: "Gặp đồng nghiệp mới",
    tags: ["công việc", "beginner"],
    lines: [
      { s: "Morgan", en: "Hi, you must be the new hire! I'm Morgan, from the design team.", vi: "Chào, chắc bạn là nhân viên mới nhỉ! Mình là Morgan, ở đội thiết kế." },
      { s: "Casey", en: "Nice to meet you, Morgan. I'm Casey, I just joined the marketing team.", vi: "Rất vui được gặp bạn, Morgan. Mình là Casey, mình vừa vào đội marketing." },
      { s: "Morgan", en: "Welcome aboard! How's your first week going so far?", vi: "Chào mừng gia nhập! Tuần đầu của bạn thế nào rồi?" },
      { s: "Casey", en: "Pretty good, though there's a lot to learn. Everyone's been really helpful.", vi: "Khá ổn, dù có nhiều thứ phải học. Mọi người ở đây rất tận tình." },
      { s: "Morgan", en: "That's great to hear. Let me know if you ever need anything.", vi: "Nghe hay quá. Cần gì thì cứ nói với mình nhé." },
      { s: "Casey", en: "Thanks, I really appreciate that.", vi: "Cảm ơn, mình rất trân trọng điều đó." }
    ],
    vocab: [
      { w: "new hire", m: "nhân viên mới" },
      { w: "welcome aboard", m: "chào mừng gia nhập (đội/công ty)" },
      { w: "so far", m: "cho đến giờ" },
      { w: "I appreciate that", m: "mình trân trọng/cảm kích điều đó" }
    ]
  },
  {
    title_en: "Apartment Hunting",
    title_vi: "Tìm thuê căn hộ",
    tags: ["nhà ở", "intermediate"],
    lines: [
      { s: "Renter", en: "Hi, I'm calling about the two-bedroom apartment listed online.", vi: "Chào, tôi gọi để hỏi về căn hộ 2 phòng ngủ được đăng trên mạng." },
      { s: "Landlord", en: "Yes, it's still available. Would you like to schedule a viewing?", vi: "Vâng, căn đó vẫn còn trống. Bạn có muốn hẹn xem nhà không?" },
      { s: "Renter", en: "Yes, please. Is Saturday afternoon possible?", vi: "Vâng, được ạ. Chiều thứ Bảy có được không?" },
      { s: "Landlord", en: "That works. How about two o'clock?", vi: "Được đó. 2 giờ chiều nhé?" },
      { s: "Renter", en: "Sounds good. Also, is the rent negotiable?", vi: "Nghe được đó. Ngoài ra, tiền thuê có thể thương lượng không?" },
      { s: "Landlord", en: "A little, depending on the lease length. We can talk more on Saturday.", vi: "Có thể một chút, tùy vào thời hạn hợp đồng thuê. Ta có thể nói thêm vào thứ Bảy." }
    ],
    vocab: [
      { w: "listed", m: "được rao/đăng (bán, cho thuê)" },
      { w: "schedule a viewing", m: "hẹn lịch xem nhà" },
      { w: "rent", m: "tiền thuê nhà" },
      { w: "negotiable", m: "có thể thương lượng" },
      { w: "lease", m: "hợp đồng thuê nhà" }
    ]
  },
  {
    title_en: "At the Gym",
    title_vi: "Ở phòng gym",
    tags: ["sức khỏe", "beginner"],
    lines: [
      { s: "Trainer", en: "Hey, are you working with a trainer, or are you on your own today?", vi: "Này, bạn đang tập với huấn luyện viên hay tự tập hôm nay vậy?" },
      { s: "Member", en: "I'm on my own, but I could use some tips on proper form.", vi: "Mình tự tập, nhưng mình cần vài lời khuyên về tư thế đúng." },
      { s: "Trainer", en: "Sure, what are you working on?", vi: "Được, bạn đang tập bài nào vậy?" },
      { s: "Member", en: "Squats, mostly. I feel like my knees cave in sometimes.", vi: "Chủ yếu là squat. Mình cảm thấy đầu gối đôi khi bị chụm vào trong." },
      { s: "Trainer", en: "Let's take a look. Try to keep your knees in line with your toes.", vi: "Để mình xem thử. Cố giữ đầu gối thẳng hàng với các ngón chân nhé." },
      { s: "Member", en: "Like this? That already feels more stable.", vi: "Như vầy hả? Cảm giác vững hơn nhiều rồi." },
      { s: "Trainer", en: "Exactly. Keep that form and you'll avoid injury.", vi: "Chính xác. Giữ đúng tư thế đó thì sẽ tránh được chấn thương." }
    ],
    vocab: [
      { w: "on your own", m: "tự làm một mình" },
      { w: "proper form", m: "tư thế/kỹ thuật đúng" },
      { w: "cave in", m: "chụm/lún vào trong" },
      { w: "in line with", m: "thẳng hàng với" },
      { w: "injury", m: "chấn thương" }
    ]
  },
  {
    title_en: "Complaint About a Late Package",
    title_vi: "Khiếu nại về gói hàng bị trễ",
    tags: ["mua sắm", "intermediate"],
    lines: [
      { s: "Customer", en: "Hi, I'm calling because my package was supposed to arrive three days ago.", vi: "Chào, tôi gọi vì kiện hàng của tôi lẽ ra phải tới cách đây 3 ngày rồi." },
      { s: "Agent", en: "I'm sorry to hear that. Can I get your order number?", vi: "Tôi rất tiếc khi nghe điều đó. Cho tôi xin mã đơn hàng của bạn?" },
      { s: "Customer", en: "Sure, it's 48213-A.", vi: "Được, mã là 48213-A." },
      { s: "Agent", en: "Let me look into that... it looks like it's stuck at the distribution center.", vi: "Để tôi kiểm tra... có vẻ như nó đang bị kẹt tại trung tâm phân phối." },
      { s: "Customer", en: "That's frustrating. What can be done about it?", vi: "Thật khó chịu. Có thể làm gì với việc này?" },
      { s: "Agent", en: "I'll escalate this and offer you a refund on the shipping fee.", vi: "Tôi sẽ chuyển vấn đề này lên cấp trên và hoàn phí vận chuyển cho bạn." },
      { s: "Customer", en: "I appreciate that. Thank you for looking into it.", vi: "Tôi cảm kích điều đó. Cảm ơn bạn đã kiểm tra giúp." }
    ],
    vocab: [
      { w: "order number", m: "mã số đơn hàng" },
      { w: "distribution center", m: "trung tâm phân phối" },
      { w: "frustrating", m: "gây khó chịu, bực bội" },
      { w: "escalate", m: "chuyển lên cấp cao hơn xử lý" },
      { w: "shipping fee", m: "phí vận chuyển" }
    ]
  },
  {
    title_en: "Planning a Date Night",
    title_vi: "Lên kế hoạch hẹn hò buổi tối",
    tags: ["bạn bè", "beginner"],
    lines: [
      { s: "Sam", en: "So, what do you feel like doing this Friday?", vi: "Vậy tối thứ Sáu này bạn muốn làm gì?" },
      { s: "Jordan", en: "How about we try that new Italian place downtown?", vi: "Hay tụi mình thử quán Ý mới ở trung tâm thành phố nhé?" },
      { s: "Sam", en: "That sounds perfect. Should we make a reservation?", vi: "Nghe tuyệt đó. Mình có nên đặt bàn trước không?" },
      { s: "Jordan", en: "Yeah, it's usually packed on weekends. I'll book a table for seven.", vi: "Ừ, cuối tuần chỗ đó thường đông lắm. Mình sẽ đặt bàn lúc 7 giờ." },
      { s: "Sam", en: "Great. Want to catch a movie afterward?", vi: "Tuyệt. Sau đó có muốn đi xem phim không?" },
      { s: "Jordan", en: "Definitely, there's a new film I've been wanting to see.", vi: "Chắc chắn rồi, có một bộ phim mới mình đang muốn xem." }
    ],
    vocab: [
      { w: "what do you feel like doing?", m: "bạn muốn làm gì?" },
      { w: "packed", m: "đông đúc, chật kín người" },
      { w: "book a table", m: "đặt bàn" },
      { w: "catch a movie", m: "đi xem phim" }
    ]
  }
];
