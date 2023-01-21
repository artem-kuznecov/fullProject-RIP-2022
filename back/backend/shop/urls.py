from django.urls import path, include
from . import views

urlpatterns = [
####################### Плохая модель заказов #######################
    path('reservations_by_username/<str:username>', views.ReservationsByUsername.as_view()),    # получить все заказы пользователя по никнейму
    path('reservations', views.ReservationsAPIView.as_view()),                                  # получить все заказы
    path('reservations/<int:pk>', views.ReservationsAPIView.as_view()),                         # изменение и удаление заказа

    path('goodslist', views.GoodsAPIView.as_view()),                                            # получить все элементы
    path('goodslist/<int:pk>', views.GoodsAPIView.as_view()),                                   # изменение и удаление товара
    path('good/<int:pk>', views.GoodsSimpleView.as_view()),                                     # получить нужный элемент по ID

####################### Хорошая модель заказов #######################
    path('active_user_orders', views.ActiveUsersOrders.as_view()),                              # заказы текущего пользователя
    path('active_user_id', views.ActiveUsersID.as_view()),                                      # идентификатор текущего пользователя
    path('is_active_user_staff', views.IsUserStaff.as_view()),                                  # проверка, является ли активный пользователь сотрудником
    path('orders', views.OrdersAPIView.as_view()),                                              # список всех заказов (добавление заказа)
    path('orders/<int:pk>', views.OrdersAPIView.as_view()),                                     # изменение и удаление товара
]
