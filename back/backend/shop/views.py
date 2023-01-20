from django.views.generic import ListView
from rest_framework.views import APIView
from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response

from .models import Goods, Orders, Reservations
from user_profile.models import UserProfile, User
from user_profile.serializers import UserProfileSerializer

from .serializers import ReservationsSimpleSerializer, GoodsSimpleSerializer, GoodsSerializer, ReservationsSerializer, OrdersSimpleSerializer, OrdersSerializer

# from django_filters.rest_framework import DjangoFilters


# class CharFilterInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
#     pass
#
#
# class NewItemsFilter(django_filters.FilterSet):  # РАБОТАЕТ ПОИСК ПО ПОЛНОМУ ВХОЖДЕНИЮ
#     name = CharFilterInFilter(field_name='name', lookup_expr='in')
#     price = django_filters.RangeFilter()
#
#     class Meta:
#         model = Goods
#         fields = ['name', 'price']
#
#
# class NewItemsList(generics.ListCreateAPIView):
#     queryset = Goods.objects.all()
#     serializer_class = GoodsSerializer
#     filter_backends = (DjangoFilterBackend,)
#     filterset_class = NewItemsFilter


# class Search(ListView):
#
#     def get_queryset(self):
#         return Orders.objects.filter(title__icontains=self.request.GET.get('q'))
#
#     def get_context_data(self, *, object_list=None, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['q'] = self.requestGET.get('q')



class GoodsAPIView(APIView):
    permission_classes = (permissions.AllowAny, )


    def get(self, request):
        g = Goods.objects.all()
        return Response(GoodsSimpleSerializer(g, many=True).data)

    def post(self, request):
        serializer = GoodsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'created': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Метод PUT не разрешен'})

        try:
            instance = Goods.objects.get(pk=pk)
        except:
            return Response({'error': 'Объект с таким идентификатором не найден'})

        serializer = GoodsSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'updated': serializer.data})

    def delete(self, request, pk):
        good_to_delete = Goods.objects.get(pk=pk)
        good_to_delete.delete()
        return Response({'success': 'Item with the received ID has been deleted'})


class GoodsSimpleView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, pk):
        g = Goods.objects.all().filter(pk=pk)
        return Response(GoodsSimpleSerializer(g, many=True).data)


class ReservationsAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        g = Reservations.objects.all()
        return Response(ReservationsSimpleSerializer(g, many=True).data)

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        price = data['price']
        image = data['image']
        description = data['description']
        orderer_id = data['orderer_id']

        # new_order = Reservations.objects.create(orderer_id=UserProfile.objects.get(id=id_user),
        #                                      tovar=Goods.objects.get(id=id_good))
        new_order = Reservations.objects.create(orderer_id=orderer_id, description=description, image=image, price=price, name=name)
        new_order.save()
        new_order = ReservationsSimpleSerializer(new_order)
        # ords = Reservations.objects.filter(orderer=id_user)
        # ords = ReservationsSimpleSerializer(ords, many=True)

        return Response({'Добавлена запись': new_order.data})
        # return Response({'success': 'заказ успешно создан', 'Все заказы этого пользователя': ords.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Метод PUT не разрешен'})

        try:
            instance = Reservations.objects.get(pk=pk)
        except:
            return Response({'error': 'Объект с таким идентификатором не найден'})

        serializer = ReservationsSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'Измененная запись': serializer.data})

    def delete(self, requset, pk):
        good_to_delete = Reservations.objects.get(pk=pk)
        good_to_delete.delete()
        return Response({'success': 'Item with the received ID has been deleted'})


class ReservationsByUsername(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, username):
        user = User.objects.get(username=username).id
        helper = UserProfile.objects.get(user_id=user).id
        ords = Reservations.objects.filter(orderer_id=helper)
        ords2 = ReservationsSimpleSerializer(ords, many=True)

        return Response(
            {'username': username, 'user.id from User': user, 'user.id from UserProfile': helper, 'orders': ords2.data})


####################### Улучшенные заказы #######################

class IsUserStaff(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            user = User.objects.get(id=user.id)

            user_profile = UserProfile.objects.get(user=user)
            user_profile_pk = user_profile.id
            staff = User.objects.get(id=user_profile_pk).is_staff

            return Response({'is_staff': staff})


        except:
            return Response({'error': 'something went wrong loading user'})


class ActiveUsersID(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            user = User.objects.get(id=user.id)
            # userr = User.objects.get(id=user.id).is_staff

            user_profile = UserProfile.objects.get(user=user)
            user_profile_pk = user_profile.id
            staff = User.objects.get(id=user_profile_pk).is_staff

            user_profile = UserProfileSerializer(user_profile)

            orders = Orders.objects.filter(user_id=user_profile_pk)
            orders = OrdersSimpleSerializer(orders, many=True)

            return Response(user_profile_pk)

        except:
            return Response({'error': 'something went wrong loading user'})


class ActiveUsersOrders(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            user = User.objects.get(id=user.id)

            user_profile = UserProfile.objects.get(user=user)
            user_profile_pk = user_profile.id

            user_profile = UserProfileSerializer(user_profile)

            orders = Orders.objects.filter(user_id=user_profile_pk)
            orders = OrdersSimpleSerializer(orders, many=True)

            # return Response({'profile': user_profile.data, 'id from UserProfile': int(user_profile_pk), 'username': str(username), 'orders': orders.data})
            return Response(orders.data)

        except:
            return Response({'error': 'something went wrong loading user'})


class OrdersAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    

    def get(self, request):
        g = Orders.objects.all()
        return Response(OrdersSimpleSerializer(g, many=True).data)

    def post(self, request, format=None):
        data = self.request.data
        item_id = data['item_id']
        user_id = data['user_id']

        new_order = Orders.objects.create(user_id=UserProfile.objects.get(id=user_id).id,
                                        item_id=Goods.objects.get(id=item_id).id)
        new_order.save()
        new_order = OrdersSimpleSerializer(new_order)
        return Response({'success': new_order.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Метод PUT не разрешен'})

        try:
            instance = Orders.objects.get(pk=pk)
        except:
            return Response({'error': 'Объект с таким идентификатором не найден'})

        serializer = OrdersSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': 'статус изменен'})

    def delete(self, request, pk):
        user = self.request.user
        staff = user.is_staff

        if staff:
            good_to_delete = Orders.objects.get(pk=pk)
            good_to_delete.delete()
            return Response({'success': 'Item with the received ID has been deleted'})
        else:
            return Response({'error': 'ты не админ, черт'})















# не используется
# class NewOrder(APIView):
#     # def post(self, request, kakashka, item_id):
#     #     data = self.request.data
#     #     # item_id = data['item_id']                          # айдишник нужного товара
#     #     user = User.objects.get(username=kakashka).id
#     #     helper = UserProfile.objects.get(user_id=user).id    # айдишник нужного пользователя
#     #     new_order = Orders.objects.create(user_id=UserProfile.objects.get(id=helper), item_id=Goods.objects.get(id=item_id))
#     #     new_order.save()
#     #     new_order = OrdersSimpleSerializer(new_order)
#     #     # user_id = data['user_id']
#     #
#     #     # serializer = OrdersSerializer(data=request.data)
#     #     # serializer.is_valid(raise_exception=True)
#     #     # serializer.save()
#     #     return Response({'Добавлена запись': new_order.data})
#
#     def post(self, request, format=None):
#         data = self.request.data
#         item_id = data['item_id']
#         user_id = data['user_id']
#
#         # user = User.objects.get(username=kakashka).id
#         # helper = UserProfile.objects.get(user_id=user).id
#         new_order = Orders.objects.create(user_id=UserProfile.objects.get(id=user_id).id, item_id=Goods.objects.get(id=item_id).id)
#         new_order.save()
#         new_order = OrdersSimpleSerializer(new_order)
#
#
#         # serializer = OrdersSerializer(data=request.data)
#         # serializer.is_valid(raise_exception=True)
#         # serializer.save()
#         return Response({'Добавлена запись': new_order.data})




