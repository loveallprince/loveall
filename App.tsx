import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { UserDashboard } from './components/UserDashboard';
import { TennisCourtMap } from './components/TennisCourtMap';
import { TennisProServices } from './components/TennisProServices';
import { MeetingList } from './components/MeetingList';
import { ReviewSystem } from './components/ReviewSystem';
import { MyPage } from './components/MyPage';
import { LoginDialog } from './components/LoginDialog';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Calendar, MapPin, Users, Star, TrendingUp, MessageCircle, Crown } from 'lucide-react';

interface User {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  favoriteLevel?: string;
  joinDate?: string;
  subscription?: {
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    nextPaymentDate: string;
    paymentMethod: string;
    amount: number;
    startDate: string;
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginDialog(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateProfile = (userData: User) => {
    setUser(userData);
  };

  const renderGuestHomePage = () => (
    <>
      <HeroSection onPageChange={setCurrentPage} />
      
      {/* Popular Tennis Courts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">인기 테니스장</h2>
            <p className="text-xl text-gray-600">사용자들에게 인기 있는 테니스장을 확인해보세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: '올림픽공원 테니스코트',
                location: '서울 송파구',
                rating: 4.6,
                reviews: 248,
                type: '하드코트',
                features: ['야간조명', '샤워실', '주차장'],
                premium: true
              },
              {
                name: '한강시민공원 망원지구 테니스코트',
                location: '서울 마포구',
                rating: 4.2,
                reviews: 134,
                type: '클레이코트',
                features: ['한강뷰', '주차장', '화장실'],
                premium: false
              },
              {
                name: '월드컵공원 테니스코트',
                location: '서울 마포구',
                rating: 4.5,
                reviews: 201,
                type: '하드코트',
                features: ['야간조명', '샤워실', '매점'],
                premium: true
              }
            ].map((court) => (
              <Card key={court.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{court.name}</CardTitle>
                        {court.premium && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Crown className="w-3 h-3 mr-1" />
                            프리미엄
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {court.location}
                      </div>
                    </div>
                    <Badge variant="secondary">{court.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{court.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">({court.reviews})</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        if (court.premium && !isLoggedIn) {
                          setShowLoginDialog(true);
                        } else {
                          setCurrentPage('courts');
                        }
                      }}
                    >
                      {court.premium && !isLoggedIn ? '프리미엄 가입' : '자세히 보기'}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {court.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Crown className="inline w-8 h-8 text-yellow-500 mr-2" />
              Love All 프리미엄
            </h2>
            <p className="text-xl text-gray-600 mb-2">매월 단 2,000원으로 모든 혜택을 누리세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-2 border-green-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">무제한 예약</h3>
                <p className="text-sm text-gray-600">전국 모든 테니스장을 제한 없이 예약하세요</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">우선 예약권</h3>
                <p className="text-sm text-gray-600">인기 테니스장을 다른 사람보다 먼저 예약</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">프로 레슨 할인</h3>
                <p className="text-sm text-gray-600">전문 코치 레슨을 특별가로 이용</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-orange-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">개인 맞춤 추천</h3>
                <p className="text-sm text-gray-600">당신의 실력과 취향에 맞는 서비스 추천</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">₩2,000</div>
            <div className="text-gray-600 mb-6">매월 / 언제든지 취소 가능</div>
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowLoginDialog(true)}
            >
              <Crown className="w-5 h-5 mr-2" />
              프리미엄 시작하기
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Meetings Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">최근 모임</h2>
            <p className="text-xl text-gray-600">새로 개설된 테니스 모임에 참여해보세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '주말 테니스 모임',
                date: '2024-12-22',
                time: '09:00',
                location: '올림픽공원 테니스코트',
                participants: 5,
                maxParticipants: 8,
                level: '초중급',
                organizer: '테니스맨',
                premium: false
              },
              {
                title: '평일 저녁 복식 게임',
                date: '2024-12-20',
                time: '19:00',
                location: '한강시민공원 망원지구 테니스코트',
                participants: 3,
                maxParticipants: 4,
                level: '중급',
                organizer: '라켓매니아',
                premium: true
              },
              {
                title: '테니스 레슨 그룹',
                date: '2024-12-25',
                time: '14:00',
                location: '보라매공원 테니스코트',
                participants: 2,
                maxParticipants: 6,
                level: '초급',
                organizer: '프로코치김',
                premium: false
              }
            ].map((meeting) => (
              <Card key={meeting.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        {meeting.premium && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Crown className="w-3 h-3 mr-1" />
                            프리미엄
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline">{meeting.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {meeting.date} {meeting.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {meeting.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {meeting.participants}/{meeting.maxParticipants}명
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      주최: {meeting.organizer}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        if (meeting.premium && !isLoggedIn) {
                          setShowLoginDialog(true);
                        } else {
                          setCurrentPage('meetings');
                        }
                      }}
                    >
                      {meeting.premium && !isLoggedIn ? '프리미엄 가입' : '더 보기'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => setCurrentPage('meetings')}
              className="bg-green-600 hover:bg-green-700"
            >
              모든 모임 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,234</div>
              <div className="text-gray-600">등록된 테니스장</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5,678</div>
              <div className="text-gray-600">프리미엄 회원</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">890</div>
              <div className="text-gray-600">이번 달 모임</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2,345</div>
              <div className="text-gray-600">작성된 리뷰</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action for Guest Users */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Love All과 함께 테니스 여정을 시작하세요!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            프리미엄 구독으로 전국 테니스장 예약부터 모임 참여까지 모든 서비스를 제한 없이 이용해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowLoginDialog(true)}
            >
              <Crown className="w-5 h-5 mr-2" />
              프리미엄 구독하기
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setCurrentPage('courts')}
            >
              무료로 둘러보기
            </Button>
          </div>
        </div>
      </section>
    </>
  );

  const renderBoardPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">테니스 게시판</h1>
        <p className="text-gray-600 mt-2">테니스 관련 정보와 팁을 공유해보세요</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                인기 게시글
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: '테니스 백핸드 마스터하기',
                    author: '프로코치김',
                    date: '2024-12-08',
                    views: 1234,
                    comments: 45
                  },
                  {
                    title: '겨울철 테니스 운동 시 주의사항',
                    author: '테니스닥터',
                    date: '2024-12-07',
                    views: 892,
                    comments: 23
                  },
                  {
                    title: '테니스 라켓 선택 가이드',
                    author: '라켓매니아',
                    date: '2024-12-06',
                    views: 756,
                    comments: 31
                  }
                ].map((post) => (
                  <div key={post.title} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-medium hover:text-green-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                      <span>조회 {post.views}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>공지사항</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">프리미엄 서비스 런칭</div>
                  <div className="text-gray-600">2024-12-17</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">겨울 할인 이벤트 진행 중</div>
                  <div className="text-gray-600">2024-11-25</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">새로운 테니스장 추가</div>
                  <div className="text-gray-600">2024-11-20</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return isLoggedIn && user ? (
          <UserDashboard user={user} onPageChange={setCurrentPage} />
        ) : (
          renderGuestHomePage()
        );
      case 'courts':
        return <TennisCourtMap />;
      case 'pro-services':
        return <TennisProServices user={user} />;
      case 'meetings':
        return <MeetingList isLoggedIn={isLoggedIn} />;
      case 'reviews':
        return <ReviewSystem isLoggedIn={isLoggedIn} />;
      case 'board':
        return renderBoardPage();
      case 'mypage':
        return user ? (
          <MyPage user={user} onUpdateProfile={handleUpdateProfile} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">로그인이 필요한 페이지입니다.</p>
          </div>
        );
      default:
        return isLoggedIn && user ? (
          <UserDashboard user={user} onPageChange={setCurrentPage} />
        ) : (
          renderGuestHomePage()
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLoginDialog(true)}
        onLogout={handleLogout}
        user={user}
      />
      
      <main>
        {renderCurrentPage()}
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🎾</span>
                </div>
                <span className="text-xl font-bold">Love All</span>
              </div>
              <p className="text-gray-400">
                전국 공공 테니스장 정보와 테니스 모임을 제공하는 프리미엄 플랫폼
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">테니스장 찾기</a></li>
                <li><a href="#" className="hover:text-white">모임 참여</a></li>
                <li><a href="#" className="hover:text-white">프로 레슨</a></li>
                <li><a href="#" className="hover:text-white">리뷰 작성</a></li>
                <li><a href="#" className="hover:text-white">게시판</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">고객센터</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">연락처</h3>
              <ul className="space-y-2 text-gray-400">
                <li>이메일: info@loveall.com</li>
                <li>전화: 02-1234-5678</li>
                <li>주소: 서울시 강남구 테니스로 123</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Love All. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}